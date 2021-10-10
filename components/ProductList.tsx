import { ActivityIndicator, Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import ProductItem, { Product } from "./ProductItem"
import ProductContext, { useProduct } from "./ProductContext"
import useProductAPI from "../hooks/useProductAPI"

interface Props{
    navigation: any
}

export default (props: Props)=>{
    
    const [items, setItems] = useState<Array<Product>>()

    const [data, loading] = useProductAPI()

    const context = useProduct()

    useEffect(()=>{
        setItems(data)
    },[loading])

    return (<>
        {!loading ? <View style={styles.cards}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 5}}>{"Showing " + items?.filter((p:Product)=>{
                if(context.searchTerm) return p.name.includes(context.searchTerm)
                return true
             }).length + " result(s)"}</Text>
            <FlatList contentContainerStyle={styles.container} windowSize={5} maxToRenderPerBatch={5} initialNumToRender={5} keyExtractor={(item, index)=> {return index.toString()} }
             data={items?.filter((p:Product)=>{
                if(context.searchTerm) return p.name.includes(context.searchTerm)
                return true
             })} renderItem={({item, index}) =><ProductItem navigation={props.navigation} product={item} index={index}></ProductItem>}></FlatList>
        </View>:<ActivityIndicator size="large" />}
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
        paddingTop: 100,
        paddingBottom: 100
    },
    hidden: {
        width: 0,
        height: 0
    }
})