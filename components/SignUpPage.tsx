import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import color from '../assets/style.json'
import { useAuth } from "./AuthContext"



export const validateEmail = (email: string) => {
    if (email.includes('@')) {
        if (email.split('@')[0].length > 1 && email.split('@')[1].length > 1) return true
    }
    return false
}
export const validatePassword = (password: string) => {
    if (password.length >= 6) return true
    return false
}
export const validateConfirmPassword = (confirm: string, password: string) => {
    return password === confirm
}


export default ({ navigation }: any) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmpasswordError, setConfirmPasswordError] = useState("")

    const [page, setPage] = useState(0)

    const [loading, setLoading] = useState(false)

    const { currentUser, signup, login } = useAuth()

    return (<>
        <Text>{currentUser ? currentUser.email : ""}</Text>
        {page === 0 ? <View style={styles.container}>

            <Text style={[styles.h, { marginBottom: 50 }]}>Sign up with your email</Text>

            <TextInput value={email} onChangeText={e => { setEmail(e) }} style={styles.input} placeholder={"Enter email"} />
            <Text style={styles.error}>{emailError}</Text>

            <TextInput value={password} onChangeText={e => { setPassword(e) }} secureTextEntry={true} style={styles.input} placeholder={"Enter password"} />
            <Text style={styles.error}>{passwordError}</Text>

            <TextInput value={confirmPassword} onChangeText={e => { setConfirmPassword(e) }} secureTextEntry={true} style={styles.input} placeholder={"Confirm password"} />
            <Text style={styles.error}>{confirmpasswordError}</Text>

            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16 }}>Already have an account?</Text><Text onPress={() => { setPage(1) }} style={{ marginLeft: 10, color: '#00f', fontSize: 16 }}>Sign in</Text>
            </View>


            <TouchableOpacity disabled={loading} onPress={() => {
                setEmailError("")
                setPasswordError("")
                setConfirmPasswordError("")

                if (!validateEmail(email)) {
                    setEmailError("Enter a valid email!")
                    return
                }
                if (!validatePassword(password)) {
                    setPasswordError("Password needs to be 6 or more characters!")
                    return
                }
                if (!validateConfirmPassword(confirmPassword, password)) {
                    setConfirmPasswordError("Confirm password needs to be the same as password!")
                    return
                }
                setLoading(true)
                signup(email, password).then(m => {
                    setLoading(false)
                    navigation.navigate('Main')
                }).catch(error => {
                    if (error.code === 'auth/invalid-email') setEmailError("Enter a valid email!")
                    if (error.code === 'auth/email-already-in-use') setEmailError("Email already in use!")
                })

            }} style={[styles.button]}>
                <Text style={styles.p}>Submit</Text>
            </TouchableOpacity>

        </View> :
            <View style={styles.container}>
                <Text style={[styles.h, { marginBottom: 50 }]}>Sign in</Text>

                <TextInput value={email} onChangeText={e => { setEmail(e) }} style={styles.input} placeholder={"Enter email"} />
                <Text style={styles.error}>{emailError}</Text>

                <TextInput value={password} onChangeText={e => { setPassword(e) }} secureTextEntry={true} style={styles.input} placeholder={"Enter password"} />
                <Text style={styles.error}>{passwordError}</Text>


                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16 }}>Don't have an account?</Text><Text onPress={() => { setPage(0) }} style={{ marginLeft: 10, color: '#00f', fontSize: 16 }}>Sign up</Text>
                </View>

                <TouchableOpacity disabled={loading} onPress={() => {
                    login(email, password).then(m => {
                        setLoading(false)
                        navigation.navigate('Main')
                    }).catch(error => {
                        console.log(error.code)
                        if(error.code === 'auth/user-not-found') setEmailError("User not found!")
                        if(error.code === 'auth/wrong-password') setPasswordError("Incorrect password!")
                    })
                }} style={[styles.button]}>
                    <Text style={styles.p}>Login</Text>
                </TouchableOpacity>
            </View>}

    </>)
}
const styles = StyleSheet.create({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        marginTop: 'auto',
        padding: 10,
    },
    button: {
        backgroundColor: color.theme.secondary_color,
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10
    },
    h: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    p: {
        fontSize: 24
    },
    input: {
        fontSize: 20,
        padding: 5,
        margin: 10,
        borderBottomWidth: 1
    },
    error: {
        fontSize: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#f00'
    }
})