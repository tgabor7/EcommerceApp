import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useEffect, useState } from "react"
import { BackHandler, Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native"
import color from '../assets/style.json'
import { styles } from "./ProductItem"

export default ({ navigation }: any) => {

    const [price, setPrice] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

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

                <View style={pageStyles.innerContainer}>

                    <TouchableOpacity style={pageStyles.cancel} onPress={() => {
                        navigation.navigate('Main')
                    }}>
                        <View style={pageStyles.cancel}>
                            <Text style={[pageStyles.text, { marginLeft: 'auto' }]}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={pageStyles.submit} onPress={() => {
                            Alert.alert('Not implemented yet!')
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
        marginTop: 50
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