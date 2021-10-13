import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useEffect, useRef } from "react"
import { Animated, Platform, StyleSheet, View } from "react-native"
import color from '../assets/style.json'

interface Props {
    navigation: any
}

export default (props: Props) => {

    const value = useRef(new Animated.Value(-1)).current

    const animationIn = Animated.timing(value, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
    })

    useEffect(()=>{
        Animated.loop(animationIn, {
            iterations: -1
        }).start()
        setTimeout(()=>{
            props.navigation.navigate('Main')
        },5000)

    },[])

    return (<>
        <View style={styles.container}>
            <Animated.View style={[styles.logo, {opacity: value.interpolate({
                inputRange: [-1,0,1],
                outputRange: [1,0,1]
            })}]}>
            <FontAwesomeIcon style={styles.icon} icon={faShoppingBasket} size={64} />
            </Animated.View>
        </View>
    </>)
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: color.theme.secondary_color,
        height: '100%',
        width: '100%',
        marginTop: 0
    },
    logo: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 200,
        height: 200,
    },
    icon: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#fff'
    }
})