import { ActivityIndicator, Dimensions, FlatList, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import ProductItem, { Product } from "./ProductItem"
import ProductContext, { useProduct } from "./ProductContext"
import useProductAPI from "../hooks/useProductAPI"

interface Props {
    navigation: any
}

export default (props: Props) => {

    const [items, setItems] = useState<Array<Product>>()

    const [data, loading, reload] = useProductAPI()

    const context = useProduct()

    const [refreshing, setRefreshing] = useState<boolean>(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        reload()
        setInterval(() => {
            setRefreshing(false)
        }, 2000)
    }, []);

    useEffect(() => {
        setItems(data)
    }, [loading])

    return (<>
        {!loading ? <View style={styles.cards}>
            <View style={{flexDirection: "row"}}>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50 }}>{"Showing " + items?.filter((p: Product) => {
                    if (context.searchTerm) return p.name.includes(context.searchTerm)
                    return true
                }).length + " result(s)"}</Text>
                <TouchableOpacity>
                    <Text style={{marginTop: 50, marginRight: 10, borderBottomWidth: 1, borderColor: '#ddd'}}>Sort: date</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } contentContainerStyle={styles.container} windowSize={5} maxToRenderPerBatch={5} initialNumToRender={5} keyExtractor={(item, index) => { return index.toString() }}
                data={items?.filter((p: Product) => {
                    if (context.searchTerm) return p.name.includes(context.searchTerm)
                    return true
                })} renderItem={({ item, index }) => <ProductItem navigation={props.navigation} product={item} index={index}></ProductItem>}></FlatList>
        </View> : <ActivityIndicator size="large" color="#000" />}
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