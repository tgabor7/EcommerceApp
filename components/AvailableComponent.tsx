import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

interface Props {
    available: boolean
    style: any
}

export default (props: Props)=>{
    
    return (<><View style={props.style}>
        <View style={styles.container}>
            <Text style={styles.text}>{props.available ? "In stock" : "Out of stock"}</Text>
        </View>
    </View></>)
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff'
    },
    inStock: {

    },
    outOfStock: {

    },
    text: {
        fontSize: 24,
        padding: 5
    }
    
})