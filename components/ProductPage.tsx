import { useFocusEffect } from "@react-navigation/core"
import React, { useEffect, useRef, useState } from "react"
import { Animated, BackHandler, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import NumberInput from "./NumberInput"
import { useProduct } from "./ProductContext"
import { addToCart, Product } from "./ProductItem"
import { styles } from './ProductItem'

interface Props {
    navigation: any
}

const getTotal = (price: number, amount: any) => {
    return (parseInt(amount) * price)
}

export default (props: Props) => {

    const [amount, setAmount] = useState<any>('1')

    const context = useProduct()

    const handleBackPress = ()=>{
        props.navigation.navigate('Main')
        return true
    }

    useFocusEffect(()=>{
        if(context.current) props.navigation.setOptions({title: context.current?.product.name})

        BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
        }
    })

    return (<>
        <View>
            <View style={pageStyles.image}></View>
            
            <ScrollView style={{height: 100}}>
                <Text style={pageStyles.description}>{context.current?.product.description}</Text>
            </ScrollView>
            
            <View style={{flexDirection: 'row'}}>
                <View style={{ flexDirection: 'row', flex: 2 }}>
                    <Text style={[pageStyles.text, { flex: 1, marginTop: 'auto', marginBottom: 'auto' }]}>Amount: </Text>
                    <NumberInput style={{ flex:1, marginLeft: 'auto', marginRight: 10 }} value={amount} changeValue={setAmount} />
                    <Text style={[pageStyles.text, { flex: 1, marginTop: 'auto', marginBottom: 'auto' }]}> {'x ' + context.current?.product.price + ' $'}</Text>
                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                <Text style={pageStyles.text}>Total: <Text style={[pageStyles.text, pageStyles.bold]}>{context.current ? getTotal(context.current.product.price, amount) : 'No data'} $ </Text></Text>

                <TouchableOpacity style={styles.button} onPress={()=>{
                    context.current ? addToCart(context.current.product, amount) : {}
                }}>
                    <Text style={styles.addText}>Add to cart</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    </>)
}

const pageStyles = StyleSheet.create({
    image: {
        backgroundColor: '#0f0',
        width: '100%',
        height: '50%',
        ...Platform.select({
            web: {
                height: 500
            }
        })
    },
    text: {
        marginLeft: 'auto',
        fontSize: 16,
        padding: 10,
        ...Platform.select({
            web: {
                fontSize: 24
            }
        })
    },
    bold: {
        fontWeight: 'bold'
    },
    description: {
        padding: 10
    }
})