import { StatusBar } from "expo-status-bar"
import React from "react"
import { BackHandler, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import NavigationBar from "./NavigationBar"
import ProductList from "./ProductList"
import ProductPage from "./ProductPage"

interface Props {
    navigation: any
}

export default (props: Props)=>{
    return (<>
        <View style={styles.container}>
          <View style={styles.navbar}>
            {/* <NavigationBar openShop={()=>{
                props.navigation.navigate('Cart')
            }} /> */}
          </View>
          <StatusBar style="auto" />
            <ProductList navigation={props.navigation} />
        </View>
    </>)
}

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0,
      overflow: 'hidden'
    },
    navbar: {
      position: 'absolute',
      width: '100%',
      elevation: 2,
      zIndex: 2,
      height: 100,
      top: 20,
      right: Platform.OS === 'web' ? 20 : 0
    }
  });