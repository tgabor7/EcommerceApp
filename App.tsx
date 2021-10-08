import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ModalComponent from './components/ModalComponent';
import NavigationBar from './components/NavigationBar';
import ProductContext from './components/ProductContext';
import { Product } from './components/ProductItem';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';

export default function App() {

  return (<View>
    <View style={styles.container}>
      <View style={styles.navbar}>
        <NavigationBar />
      </View>
      <StatusBar style="auto" />
      <ProductContext>
        <ProductList />
        <ModalComponent >
          <ProductPage />
        </ModalComponent>
      </ProductContext>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS !== 'web' ? 20 : 0,
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
