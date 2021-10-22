import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useFocusEffect } from "@react-navigation/core"
import React, { useEffect, useRef, useState } from "react"
import { Animated, BackHandler, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import color from '../assets/style.json'
import DrawerContent from "./DrawerContent"

export default ({ open, setOpen,navigation }: any) => {

    const value = useRef(new Animated.Value(0)).current

    const [dx, setDx] = useState(0)
    const [oldX, setOldX] = useState(0)
    const [x, setX] = useState(0)

    const animationOpen = Animated.timing(value, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
    })
    const animationClose = Animated.timing(value, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
    })
    const handleBackPress = () => {
        animationClose.start()
        setTimeout(() => {
            setOpen(false)
        }, 300)
        return true
    }

    useEffect(() => {
        if (open) animationOpen.start()
        BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
        }
    }, [open])

    return (<>
        {open && <><View

            onTouchStart={(e: any) => {
                setOldX(e.nativeEvent.pageX)
            }}
            onTouchEnd={(e: any) => {
                if (dx >= 0) {
                    animationClose.start()
                    setTimeout(() => {
                        setOpen(false)
                    }, 300)
                }
            }}
            onTouchMove={(e: any) => {
                setX(e.nativeEvent.pageX)
                setDx(oldX - x)
                setOldX(x)
            }}
            style={styles.container}>
        </View>

            <Animated.View style={[styles.innerContainer,
            {
                transform: [{
                    translateX: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-300, 0]
                    })
                }]
            }, {
                // transform: [{
                //     translateX: Math.min(x - 300, 0)
                // }]
            }]}>
                <TouchableOpacity style={{ marginTop: 40, marginLeft: 10 }} onPress={() => {
                    animationClose.start()
                    setTimeout(() => {
                        setOpen(false)
                    }, 300)
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} />
                </TouchableOpacity>
                <DrawerContent setOpen={setOpen} navigation={navigation} />
            </Animated.View></>}
    </>)
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: .5,
        width: '100%',
        height: '100%',
        top: 20
    },
    innerContainer: {
        position: 'absolute',
        width: 300,
        height: '100%',
        opacity: 1,
        backgroundColor: color.theme.secondary_color
    }
})