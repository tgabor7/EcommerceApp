import React, { useRef, useState } from 'react';
import ShoppingCart from './components/ShoppingCart';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './components/MainScreen';
import CustomTitle from './components/CustomTitle';
import { createStackNavigator, HeaderStyleInterpolators, StackNavigationOptions, TransitionSpecs } from '@react-navigation/stack';
import ProductPage from './components/ProductPage';
import ProductContext, { useProduct } from './components/ProductContext';
import color from './assets/style.json'
import SplashScreen from './components/SplashScreen';
import SubmitProduct from './components/SubmitProduct';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NavigationDrawer from './components/NavigationDrawer';
import AuthProvider from './components/AuthContext';
import SignUpPage from './components/SignUpPage';

export default function App() {

  const Stack = createStackNavigator()
  const context = useProduct()
  const [openDrawer, setOpenDrawer] = useState(false)
  const navigationContainer = useRef(null)

  const CartTrasition: StackNavigationOptions = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [{
            translateX: next ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -layouts.screen.width]
            }) : current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          ]
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.9],
          }),
        },
      };
    },
  }

  const ProductTransition: StackNavigationOptions = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [{
            translateX: next ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, layouts.screen.width]
            }) : current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
          ]
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.9],
          }),
        },
      };
    },
  }

  return (<>
    <AuthProvider>
      <ProductContext>
        <NavigationContainer ref={navigationContainer}>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainScreen} options={{ title: 'EcommerceApp', header: props => <CustomTitle openDrawer={setOpenDrawer} {...props} /> }} />
            <Stack.Screen name="Cart" component={ShoppingCart} options={{ headerStyle: { backgroundColor: color.theme.secondary_color, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }, ...CartTrasition }} />
            <Stack.Screen name="Product" component={ProductPage} options={{ headerStyle: { backgroundColor: color.theme.secondary_color, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }, ...ProductTransition }} />
            <Stack.Screen name="Submit" component={SubmitProduct} options={{ headerStyle: { backgroundColor: color.theme.secondary_color, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }, }} />
            <Stack.Screen name="Signup" component={SignUpPage} options={{ headerStyle: { backgroundColor: color.theme.secondary_color, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }, }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductContext>
      <NavigationDrawer navigation={navigationContainer} open={openDrawer} setOpen={setOpenDrawer} />
    </AuthProvider>
  </>
  );
}