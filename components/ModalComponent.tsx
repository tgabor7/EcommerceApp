import { useContext, useEffect, useRef } from "react"
import { Animated, BackHandler, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from 'react'
import ProductContext, { ProductValue, useProduct } from "./ProductContext"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

interface Props {
    children: any
}

export default (props: Props) => {

    const context = useProduct()
    const value = useRef(new Animated.Value(1)).current

    const openAnimation = Animated.timing(value, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: false
    })
    const closeAnimation = Animated.timing(value, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
    })

    BackHandler.addEventListener('hardwareBackPress', ()=>{
        
        if(!context.show){
            BackHandler.exitApp()
        }

        if(context.setShow){
            context.setShow(false)
            return true
        }else{
            return false
        }
    })

    useEffect(() => {
        if (context.show) openAnimation.start()
        else closeAnimation.start()

    }, [context.show])

    return (<>{context.show && <View style={styles.background}></View>}
        {<Animated.View style={[styles.container, {
            top: value.interpolate({
                inputRange: [1, 1.1],
                outputRange: [Dimensions.get('window').height, 20]
            })
        }]}>
            <TouchableOpacity style={styles.closeModal} onPress={() => { context.setShow ? context.setShow(false) : {} }}>
                <View>
                    <FontAwesomeIcon style={styles.icon} icon={faArrowLeft} size={20} />
                </View>
            </TouchableOpacity>
            {props.children}

        </Animated.View>}
    </>)
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,
        marginTop: 'auto',
        elevation: 10,
        width: '100%',
        height: '100%',
        backgroundColor: '#ddd',
        ...Platform.select({
            web: {
                width: 500,
                height: '100%'
            }
        })
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: .8,
        top: 20,
        zIndex: 2
    },
    closeModal:{
        position: 'absolute',
        elevation: 20,
        zIndex: 3,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 20,
        marginRight: 'auto',
        marginLeft: 10
    },
    icon: {
        color: '#000',
        margin: 5
    }
})