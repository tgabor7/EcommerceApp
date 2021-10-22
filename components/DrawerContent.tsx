import React from "react"

import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import AuthProvider, { useAuth } from "./AuthContext"

export default ({ navigation, setOpen }: any) => {

    const { currentUser } = useAuth()

    //emial format, password at least 6 characters
    return (<>
        <View style={styles.container}>
            <View style={styles.profile}>

            </View>
            <Text>{currentUser ? "Logged in as : " +currentUser.email : ''}</Text>
            {!currentUser ? <TouchableOpacity style={styles.button} onPress={() => {
                navigation.current.navigate("Signup")
                setOpen(false)
            }}>
                <Text style={{ fontSize: 24 }}>Sign up!</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={() => {
            }}>
                <Text style={{ fontSize: 24 }}>Log out!</Text>
            </TouchableOpacity>}
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    profile: {
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        borderRadius: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    button: {
        backgroundColor: '#fff',
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20
    }
})