import React, { useRef, useState } from "react"
import { Animated, Dimensions, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { faShoppingBasket, faAsterisk, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

interface Props{
    openShop: ()=> void
}

export default (props : Props) => {

    const [focus, setFocus] = useState(false)

    const value = useRef(new Animated.Value(1)).current

    const searchAnimationFocus = () => {
        Animated.timing(value, {
            toValue: 1.1,
            duration: 100,
            useNativeDriver: false
        }).start()
    }
    const searchAnimationFocusOut = () => {
        Animated.timing(value, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false
        }).start()
    }

    return (<>
        <View style={styles.container}>
            <Animated.View style={[styles.search, focus ? styles.focus : {}, Platform.OS !== 'web' ? { marginRight: value.interpolate({
                inputRange: [1, 1.1],
                outputRange: ['0%', '-20%']
            })} : {}]}>
                <TextInput underlineColorAndroid="transparent" style={styles.inputStyle} onFocus={() => {
                    setFocus(true)
                    searchAnimationFocus()
                }} onBlur={() => {
                    setFocus(false)
                    searchAnimationFocusOut()

                }} placeholder="Search">
                </TextInput>
                <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} size={24} />

            </Animated.View>
            <Animated.View style={[styles.innerContainer,
            Platform.OS !== 'web' ? { transform: [{translateY: value.interpolate({
                inputRange: [1,1.1],
                outputRange: [0, 60]
            })}] }:{}]}>
                <TouchableOpacity style={styles.buttonStyle} onPress={props.openShop}>
                    <FontAwesomeIcon style={styles.iconStyle} icon={faShoppingBasket} size={32} />
                </TouchableOpacity>
            </Animated.View>
        </View>
    </>)
}

const styles = StyleSheet.create({
    searchIcon: {
        marginRight: 10,
        marginLeft: 10,

        marginTop: Platform.OS === 'web' ? 'auto' : 0,
        marginBottom: Platform.OS === 'web' ? 'auto' : 0,

        top: Platform.OS === 'web' ? 15 : 15,
        color: '#aaa',
    },
    focus: {
        borderWidth: 1,
        borderStyle: 'solid'
    },
    search: {
        borderStyle: 'solid',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
        height: 50,
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 24,
        marginLeft: '2%',
        marginRight: 0,
        paddingLeft: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    innerContainer: {
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 5
    },
    container: {
        height: 80,
        flexDirection: 'row',
    },
    buttonStyle: {
        color: '#fff',
        backgroundColor: '#303',
        borderRadius: 50,
        padding: 8,
        marginRight: '10%',
        marginLeft: 'auto',
        marginTop: 'auto',
    },
    iconStyle: {
        color: '#fff',
        margin: 'auto',
        textAlign: 'center',
        alignContent: 'center',
        textAlignVertical: "auto"
    },
    inputStyle: {
        flex: 1,
        width: '90%',
        fontSize: 24,
        borderWidth: 0,
        ...Platform.select({
            web: {
                outlineWidth: 0
            }
        })

    }
})