import React, { useEffect, useRef } from "react"
import { Animated, Platform, StyleSheet, View } from "react-native"

interface Props {
    navigation: any
}

export default (props: Props) => {

    const value = useRef(new Animated.Value(0)).current

    const animationIn = Animated.timing(value, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false
    })
    
    const animationOut = Animated.timing(value, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
    })

    useEffect(()=>{
        animationIn.start()
        setTimeout(()=>{
            props.navigation.navigate('Main')
        },2000)

    },[])

    return (<>
        <View style={styles.container}>
            <Animated.View style={[styles.logo, {opacity: value.interpolate({
                inputRange: [0,1],
                outputRange: [0,1]
            })}]}>

            </Animated.View>
        </View>
    </>)
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%',
        marginTop: Platform.OS === 'web' ? 0 : 20
    },
    logo: {
        backgroundColor: '#f00',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 200,
        height: 200,
        borderRadius: 100
    }
})