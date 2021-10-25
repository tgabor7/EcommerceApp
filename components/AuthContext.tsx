import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@firebase/auth"

export interface UserData {
    currentUser: any
    signup: (email: string, password: string) => Promise<any>
    login: (email: string, password: string) => Promise<any>
    logout: () => Promise<any>
}


const AuthContext = React.createContext<UserData>({ currentUser: {}, signup: async () => { }, login: async () => { }, logout: async () => { } })

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = (props: any) => {

    const [userData, setUserData] = useState<any>({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            setUserData(user)
        })

        return unsubscribe

    }, [])


    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        return signOut(auth)
    }

    return (<AuthContext.Provider value={{ currentUser: userData, signup: signup, login: login, logout: logout }}>
        {props.children}
    </AuthContext.Provider>)
}
export default AuthProvider