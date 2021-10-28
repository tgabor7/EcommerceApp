import { Animated, BackHandler, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import color from '../assets/style.json'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import SubmitProduct from "./SubmitProduct"

interface Props {
    navigation: any
}

export default ({ navigation }: Props) => {

    return (<>
        <View style={[styles.container]}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Submit')
            }}>
                <View style={[{
                    width: '100%', height: '100%', backgroundColor: color.theme.secondary_color,
                    borderRadius: 30
                }]}>

                    <FontAwesomeIcon style={styles.icon} icon={faPlus} size={24} />
                </View>
            </TouchableOpacity>
            {
            }
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        zIndex: 10
    },
    icon: {
        marginTop: 'auto',
        marginLeft: 'auto',
        marginBottom: 'auto',
        marginRight: 'auto',
        color: '#fff'
    }
})