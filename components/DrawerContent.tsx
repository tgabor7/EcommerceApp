import React from "react"

import { StyleSheet, View } from "react-native"

export default ()=>{
    return (<>
        <View style={styles.container}>
            <View style={styles.profile}>

            </View>
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
    }
})