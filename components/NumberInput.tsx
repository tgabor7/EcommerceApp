import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useDebugValue } from "react"
import { StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import color from '../assets/style.json'

interface Props{
    style: StyleProp<ViewStyle>
    value: any
    changeValue: (n:any) => void
}

const validate = (n: string, m: number) => {
    if(parseInt(n)+m < 1) return false
    return true
}

export default (props: Props) => {
    return (<><View style={props.style}>
        <View style={styles.button}>
            <TouchableOpacity onPress={()=>{
                if(validate(props.value,1)) props.changeValue((parseInt(props.value) + 1).toString())
            }}>
                <FontAwesomeIcon icon={faArrowUp} style={styles.icon} />
            </TouchableOpacity>
        </View>
        <TextInput maxLength={3} style={styles.input} value={props.value} />

        <View style={styles.button}>
            <TouchableOpacity onPress={()=>{
                if(validate(props.value,-1)) props.changeValue((parseInt(props.value) - 1).toString())
            }}>
                <FontAwesomeIcon icon={faArrowDown} style={styles.icon}/>
            </TouchableOpacity>
        </View>
        </View>
    </>)
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: color.theme.secondary_color,
        margin: 'auto',
        width: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: '#111',
        margin: 'auto',
        width: 50,
        textAlign: 'center',
        fontSize: 24,
        padding: 5
    },
    icon: {
        color: '#fff',
        margin: 15
    }
})