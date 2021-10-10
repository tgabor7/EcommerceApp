import React, { useState } from 'react';
import ShoppingCart from './components/ShoppingCart';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './components/MainScreen';
import CustomTitle from './components/CustomTitle';
import { createStackNavigator } from '@react-navigation/stack';
import ProductPage from './components/ProductPage';
import ProductContext, { useProduct } from './components/ProductContext';
import color from './assets/style.json'

export default function App() {

  const Stack = createStackNavigator()
  const context = useProduct()

  return (
    <ProductContext>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} options={{ title: 'EcommerceApp', header: props => <CustomTitle {...props} /> }} />
          <Stack.Screen name="Cart" component={ShoppingCart} options={{headerStyle: {backgroundColor: color.theme.secondary_color, borderBottomEndRadius: 10, borderBottomStartRadius: 10}}} />
          <Stack.Screen name="Product" component={ProductPage} options={{headerStyle: {backgroundColor: color.theme.secondary_color, borderBottomEndRadius: 10, borderBottomStartRadius: 10}}} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductContext>

  );
}