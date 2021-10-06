import React, { useEffect, useRef, useState } from "react"
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import usePage from "../hooks/usePage"
import { Product } from "./ProductItem"

export default () => {

    const [page, setPage, transition] = usePage()

    return (<>
        <View style={page === 1 ? styles.container : styles.hidden}>
            <TouchableOpacity onPress={() => { setPage(0) }}>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
                <Text >Back</Text>
            </TouchableOpacity>
        </View>
    </>)
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        zIndex: 1,
        elevation: 1,
        width: 500,
        height: 500,
        backgroundColor: '#000'
    },
    hidden: {
        width: 0
    }
})