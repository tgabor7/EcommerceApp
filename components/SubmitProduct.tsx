import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import color from '../assets/style.json'


export default ({ close }: any) => {
    return (<>
        <View style={pageStyles.container}>
            <View style={pageStyles.navbar}>
                <TouchableOpacity onPress={() => {
                    close()
                }}>
                    <View style={pageStyles.icon}>
                        <FontAwesomeIcon icon={faTimes} size={24} />
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    </>)
}

const pageStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
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
    }
})