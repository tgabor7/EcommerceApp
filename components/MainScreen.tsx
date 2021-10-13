import { useFocusEffect } from "@react-navigation/core"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { Alert, BackHandler, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import ActionButton from "./ActionButton"
import NavigationBar from "./NavigationBar"
import ProductList from "./ProductList"
import ProductPage from "./ProductPage"

interface Props {
  navigation: any
}

export default (props: Props) => {

  const [quit, setQuit] = useState<boolean>(false)

  const handleBackPress = ()=>{
    if(quit){
      BackHandler.exitApp()
    }else{
      setQuit(true)
      ToastAndroid.show('Press back again to close app', ToastAndroid.SHORT)
      setTimeout(()=>{
        setQuit(false)
      }, 500)
      return true
    }
    return true
    
}
  useFocusEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    }
  })


  return (<>

    <View style={styles.container}>

      <View style={styles.navbar}>
      </View>
      <StatusBar style="auto" />
      <ProductList navigation={props.navigation} />
    </View>
    <ActionButton navigation={props.navigation} />
  </>)
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    overflow: 'hidden',
    height: '100%'
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