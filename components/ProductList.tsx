import { Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import ProductItem, { Product } from "./ProductItem"
import ProductContext, { useProduct } from "./ProductContext"

interface Props{
}

export default (props: Props)=>{
    
    const [items, setItems] = useState<Array<Product>>([
        {name: 'ez', price: 10, available: true, rating: 4, key: '0', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero nec arcu pellentesque ornare. Fusce tristique purus lectus, et varius odio pellentesque et. Pellentesque eget augue tempor est imperdiet lobortis vitae non nisi. Ut metus nunc, hendrerit id lectus ultricies, pulvinar faucibus erat. Vestibulum pretium lorem mauris, sed mattis elit semper a. Sed varius porta dignissim. Duis neque massa, volutpat sit amet nisi ac, vulputate pretium mi. Phasellus et ex in urna sodales pharetra ut nec enim. Cras id libero mi.'},
        {name: 'ez', price: 12, available: true, rating: 4.5, key: '1'},
        {name: 'ez', price: 1, available: true, rating: 4, key: '2'},
        {name: 'ez', price: 3, available: true, rating: 4, key: '3'},
        {name: 'ez', price: 6, available: true, rating: 4, key: '4'},
        {name: 'ez', price: 2, available: true, rating: 4, key: '5'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '6'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '7'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '8'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '9'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '10'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '11'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '12'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '13'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '14'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '15'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '16'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '17'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '18'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '19'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '20'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '21'},
        {name: 'ez', price: 0, available: true, rating: 4, key: '22'},
    ])
    useEffect(()=>{
        let tmp = []
        console.log('item list rerendered')
        for(let i = 0;i<1000;i++){
            tmp.push({name: 'ez', price: (i % 10), available: true, rating: 4.5, key: i.toString(), description: 'awbdauiwbdiauwbdioauwhgdiauwzdgbiahwdiauwhdiauwhdiaugdaizwgdioawugdiaowgdoaiwzugd'})
        }
        setItems(tmp)
    },[])
    

    return (<>
        <View style={styles.cards}>
            <FlatList contentContainerStyle={styles.container} windowSize={5} maxToRenderPerBatch={5} initialNumToRender={5} keyExtractor={(item, index)=> {return index.toString()} }
             data={items} renderItem={({item, index}) =><ProductItem product={item} index={index}></ProductItem>}></FlatList>
        </View>
    </>)
}
const styles = StyleSheet.create({
    cards: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        height: Dimensions.get('window').height,
        marginTop: 0
    },
    container: {
        paddingTop: 100
    },
    hidden: {
        width: 0,
        height: 0
    }
})