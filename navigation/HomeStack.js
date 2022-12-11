import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect, useContext } from 'react';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack