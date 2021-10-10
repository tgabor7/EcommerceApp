import React, { useEffect } from "react"
import { Alert, Dimensions, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AvailableComponent from "./AvailableComponent"
import ProductContext, { ProductRecord, useProduct } from "./ProductContext"
import RatingComponent from "./RatingComponent"
import AsyncStorage from "@react-native-async-storage/async-storage"
import colors from '../assets/style.json'

export interface Product {
    name: String
    price: number
    description?: String
    rating: number
    available: boolean
    key: any
}
interface Props {
    product: Product
    index: any
    navigation: any
}

const MAX_DESCRIPTION_LENGTH = 200

const checkDuplicates = async (product: Product) => {
    let json = await AsyncStorage.getItem('cart')
    if (!json) return false
    let data = JSON.parse(json)
    if (data.find((e: ProductRecord) => product.key === e.product.key)) return true
    return false
}


export const addToCart = async (product: Product, amount: number) => {
    let is_duplicate = await checkDuplicates(product)
    if (is_duplicate) {
        Alert.alert('Failed', 'Item already in shopping cart!')
        return
    }
    Alert.alert('Success', 'Added item to cart')
    try {
        let cartData = await AsyncStorage.getItem('cart')
        let cart: any = []
        if (cartData) {
            cart = JSON.parse(cartData)
        }

        cart.push({ product: product, amount: amount })

        await AsyncStorage.setItem(
            'cart',
            JSON.stringify(cart)
        );
    } catch (error) {
        // Error saving data
    }
}

export default (props: Props) => {

    const context = useProduct()

    return (<>

        <View style={styles.card}>
            <TouchableOpacity onPress={() => {
                context.setProduct ? context.setProduct({ product: props.product, amount: 1 }) : ''
                props.navigation.navigate('Product')
            }}>
                <Text style={styles.name}>{props.product.name}</Text>

                {/* <RatingComponent style={styles.rating} rating={this.props.product.rating} key={this.props.key}></RatingComponent> */}
                <Text style={styles.description}>{
                    props.product.description ? (props.product.description.length < MAX_DESCRIPTION_LENGTH ? props.product.description : props.product.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...') : 'No description available.'
                }</Text>
                <View style={styles.image}>
                    <AvailableComponent available={props.product.available} style={styles.available}></AvailableComponent>
                </View>
            </TouchableOpacity>
            <Text style={styles.price}>{props.product.price + '$'}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                addToCart(props.product, 1).then(() => {
                    console.log('Product added to cart')
                })
            }}>
                <Text style={styles.addText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    </>)

}

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    description: {
        fontSize: 16,
        padding: 10
    },
    available: {
        marginTop: '10%',
        marginBottom: 'auto',
        marginRight: 'auto'
    },
    card: {
        width: Platform.OS === 'web' ? 500 : '90%',
        backgroundColor: '#eee',
        margin: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    price: {
        fontSize: 24,
        marginTop: 'auto',
        marginLeft: 'auto',
        padding: 10
    },
    name: {
        fontSize: 32,
        color: '#000',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    rating: {
        marginRight: 'auto',
        marginBottom: 'auto',
        marginLeft: 50
    },
    button: {
        margin: 5,
        backgroundColor: colors.theme.secondary_color,
        marginLeft: 'auto',
        borderRadius: 5

    },
    addText: {
        color: '#fff',
        padding: 5,
        fontSize: 20,
    },
    image: {
        width: '100%',
        height: 400,
        backgroundColor: '#0f0',
        margin: 'auto'
    }
})