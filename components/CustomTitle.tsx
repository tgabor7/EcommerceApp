import { faSearch, faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useEffect, useState } from "react"
import { Animated, BackHandler, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import color from '../assets/style.json'
import { useProduct } from "./ProductContext"

export default (props: any) => {

    const value = React.useRef(new Animated.Value(0)).current
    const input = React.useRef<TextInput>(null)
    const [searchInput, setSearchInput] = useState<string>()

    const context = useProduct()

    const focusAnimation = Animated.timing(value, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
    })
    const focusOutAnimation = Animated.timing(value, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
    })


    const handleBackPress = () => {
        input.current ? input.current.blur() : ''
        return true
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
        }
    },[])

    return (<>
        <View style={styles.container}>
            <View style={{ flex: 4 }}>
                <Animated.View style={[styles.innerContainer, {
                    width:
                        value.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['80%', '100%']
                        })
                }]}>
                    <TextInput ref={input} value={searchInput} onChangeText={
                        t=>{
                            setSearchInput(t)
                            context.setSearchTerm ? context.setSearchTerm(t) : {}
                        }
                    } onFocus={() => {
                        focusAnimation.start()
                    }} onBlur={() => {
                        focusOutAnimation.start()
                    }} style={styles.input} placeholder='Search'></TextInput>
                
                    {!context.searchTerm ? <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} size={24} /> : 
                    <TouchableOpacity onPress={()=>{
                        setSearchInput('')
                        context.setSearchTerm ? context.setSearchTerm('') : {}
                    }}><FontAwesomeIcon style={styles.searchIcon} icon={faTimes} size={24} /></TouchableOpacity>}
                
                </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.cart}>
                    <TouchableOpacity onPress={
                        () => {
                            props.navigation.navigate('Cart')
                        }
                    }>
                        <FontAwesomeIcon style={styles.cartIcon} icon={faShoppingBasket} size={32} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </>)
}
const styles = StyleSheet.create({
    cart: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 50,
        marginTop: 'auto',
        marginBottom: 20,
    },
    cartIcon: {
        margin: 8
    },
    container: {
        flexDirection: 'row',
        backgroundColor: color.theme.secondary_color,
        paddingTop: 20,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    innerContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '100%',
        height: 50,
        marginTop: 'auto',
        marginBottom: 20,
        marginLeft: 10
    },
    input: {
        fontSize: 18,
        padding: 5,
        width: '80%'
    },
    searchIcon: {
        marginRight: 10,
        marginLeft: 10,
        color: '#aaa',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
})