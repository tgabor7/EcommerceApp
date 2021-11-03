import { getAuth, sendEmailVerification } from "@firebase/auth"
import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import { BackHandler, Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Image } from "react-native"
import color from '../assets/style.json'
import { useAuth } from "./AuthContext"
import { Product, styles } from "./ProductItem"
import axios from "axios"
import usePost from "../hooks/usePost"
import DocumentPicker from 'react-native-document-picker'
import * as ImagePicker from 'expo-image-picker'

export const prepareMessage = (product: Product) => {

}

export default ({ navigation }: any) => {

    const [price, setPrice] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [images, setImages] = useState<any[]>([])

    const { currentUser } = useAuth()

    const [loading, callAPI] = usePost("https://ecommerceappbackend1.herokuapp.com/api/post")

    const handleBackPress = () => {
        navigation.navigate('Main')
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
        }
    }, [])


    return (<>
        <View style={pageStyles.container}>
            <ScrollView>
                <View style={pageStyles.field}>
                    <Text style={pageStyles.text}>Name: </Text><TextInput value={name} onChangeText={e => {
                        setName(e)
                    }} style={pageStyles.input} placeholder={"product name"} />
                </View>
                <View style={pageStyles.field}>
                    <Text style={pageStyles.text}>Price: </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput value={price.toString()} onChangeText={e => {
                            let n = parseInt(e)
                            if (e === '') {
                                setPrice(0)
                                return
                            }
                            if (n) setPrice(n)
                        }} style={[pageStyles.input, { flex: 3 }]} />
                        <Text style={[pageStyles.text, { flex: 1, marginLeft: 10 }]}>$</Text>
                    </View>
                </View>
                <View style={pageStyles.field}>
                    <Text style={pageStyles.text}>Description: </Text><TextInput value={description} onChangeText={e => {
                        setDescription(e)
                    }} multiline={true} style={[pageStyles.input, { textAlignVertical: 'top', height: 200 }]} placeholder={"description"} />
                </View>
                <View style={pageStyles.field}>
                    <TouchableOpacity onPress={async () => {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        });


                        if (!result.cancelled) {
                            // var formData = new FormData();
                            // var value : unknown = { uri: result.uri, name: 'image.jpg', type: 'image/jpeg' }
                            // formData.append('file', value as Blob)
                            // axios.post("http://192.168.1.8:3000/api/post", formData, {headers: {
                            //     'auth': 'adawd'
                            // }}).then(res=>{
                            //     console.log(res)
                            // }).catch(err=>{
                            //     console.log(err)
                            // })
                            setImages(images.concat([result.uri]))
                        }
                    }}>
                        <Text>pick images</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#f0f', padding: 10 }}>
                        {images?.map((e: string, index: number) => {
                            return <View key={index} >
                                <View style={{ position: 'absolute', zIndex: 1, elevation: 1 }}>
                                    <TouchableOpacity onPress={()=>{
                                        setImages(images.filter((e,i)=>{
                                            return i !== index
                                        }))
                                    }}>
                                        <FontAwesomeIcon icon={faTimes} size={24} />
                                    </TouchableOpacity>
                                </View>

                                <Image style={{ width: 100, height: 100 }} source={{ uri: e }}></Image>
                            </View>
                        })}
                    </View>
                </View>
                <View style={pageStyles.innerContainer}>

                    <TouchableOpacity style={pageStyles.cancel} onPress={() => {
                        navigation.navigate('Main')
                    }}>
                        <View style={pageStyles.cancel}>
                            <Text style={[pageStyles.text, { marginLeft: 'auto' }]}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={pageStyles.submit} onPress={() => {

                        if (name.length <= 0) return
                        if (description.length <= 0) return

                        currentUser.getIdToken(true).then((idToken: any) => {

                            callAPI({ 'auth': idToken }, { key: 0, name: name, description: description, price: price, available: true, rating: 1 }).then(() => {
                                navigation.navigate("Main")
                            })

                            // axios.post<Product, {data: string}>("http://192.168.1.10:3000/api/post", {key: 0,name: name, description: description, price: price, available: true, rating: 1}, {
                            //     headers: {
                            //         'auth': idToken
                            //     }
                            // }).then(response => {
                            //     if(response.data === "Success!") {
                            //         navigation.navigate("Main")
                            //     }
                            // }).catch(err => {
                            //     console.log(err)
                            // })
                        }).catch((error: any) => {
                            console.log(error)
                        })


                    }}>
                        <View style={pageStyles.submit}>
                            <Text style={[pageStyles.text, { marginLeft: 'auto' }]}>Submit</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    </>)
}

const pageStyles = StyleSheet.create({
    container: {
    },
    navbar: {
        width: '100%',
        height: 80,
        backgroundColor: color.theme.secondary_color,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    icon: {
        marginTop: 'auto',
        marginBottom: 'auto',
        elevation: 10,
        zIndex: 20
    },
    cancel: {
        backgroundColor: '#aaa',
        borderRadius: 5,
        width: 100,
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    submit: {
        borderRadius: 5,
        width: 100,
        height: 50,
        backgroundColor: color.theme.secondary_color,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    innerContainer: {
        flexDirection: "row",
        marginTop: 50,
        paddingBottom: 50,
    },
    text: {
        fontSize: 24,
        marginRight: 'auto',
        marginBottom: 'auto',
        marginTop: 'auto',
    },
    field: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
    },
    input: {
        fontSize: 22,
        paddingLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 44
    }
})