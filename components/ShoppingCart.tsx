import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react"
import { BackHandler, FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Product } from "./ProductItem";
import color from '../assets/style.json'
import { ProductRecord } from "./ProductContext";
import { useFocusEffect } from "@react-navigation/core";

interface Props {
    navigation: any
}

export default (props: Props) => {

    const [items, setItems] = useState<Array<ProductRecord>>()
    const getCart = async () => {
        try {
            const value = await AsyncStorage.getItem('cart');
            if (value !== null) {
                const data = JSON.parse(value)
                setItems(data)
            }
        } catch (error) {
            console.error('Something went wrong!')
        }
    }

    const handleBackPress = () => {
        props.navigation.navigate('Main')
        return true
    }

    const removeItem = (key : any) => {
        let tmp = items?.filter((e:ProductRecord)=>e.product.key !== key)
        setItems(tmp)
        AsyncStorage.setItem('cart', JSON.stringify(tmp))
    }
    const removeAllItems = ()=>{
        try{
            AsyncStorage.setItem(
                'cart',
                JSON.stringify([])
            );
            setItems([])
        }catch(error){

        }
    }

    const sumReducer = (prev : number, current: ProductRecord)=>{
        return prev + current.amount * current.product.price
    }

    useFocusEffect(() => {
        getCart()
        BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
        }
    })

    return (<>
        {items?.length !== 0 ? <ScrollView>

            <View style={styles.container}>
                {items?.map((p: ProductRecord) =>
                    <View style={styles.item} key={p.product.key}>
                        <Text style={styles.text}>{p.product.name}</Text>
                        <Text style={styles.price}>{p.amount}x</Text>
                        <Text style={styles.price}>{p.product.price} $</Text>
                        <TouchableOpacity onPress={()=>{
                            removeItem(p.product.key)
                        }}>
                            <FontAwesomeIcon style={styles.icon} size={24} icon={faTimes} />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.pay, {backgroundColor: '#f00'}]}>
                        <TouchableOpacity onPress={()=>{
                            removeAllItems()
                        }}>
                            <Text style={{ fontSize: 20, color: '#fff', padding: 5 }}>Clear Shopping Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.total}>Total: {
                        items?.reduce<number>(sumReducer, 0)
                    } $</Text>

                </View>
                <View style={styles.pay}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 24, color: '#fff' }}>Pay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView> : 
        <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto',marginRight: 'auto'}}>
                No items in your cart. Start Shopping now :)
            </Text>}

    </>)
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'web' ? 0 : 20
    },
    icon: {
        marginTop: 'auto',
        color: '#f00'
    },
    item: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
        height: 50
    },
    price: {
        flex: 1,
        fontSize: 16,
        marginRight: 'auto',
        marginTop: 'auto'
    },
    text: {
        fontSize: 16,
        flex: 4,
        marginLeft: 'auto',
        marginTop: 'auto'
    },
    total: {
        fontSize: 24,
        marginLeft: 'auto',
        marginTop: 20,
        marginRight: 20,
    },
    pay: {
        backgroundColor: color.theme.secondary_color,
        marginLeft: 'auto',
        marginRight: 20,
        padding: 10,
        borderRadius: 5,
        marginTop: 50
    }
})