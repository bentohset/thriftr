import { View, Text } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator initialRouteName="Cart" screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
    )
}

export default CartStack