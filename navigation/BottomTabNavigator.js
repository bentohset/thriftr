import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeStack from './HomeStack';
import ChatStack from './ChatStack';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        
      }}
    >
        <Tab.Screen name="Home" component={HomeStack}/>
        <Tab.Screen name="Chat" component={ChatStack}/>
        <Tab.Screen name="Cart" component={CartStack}/>
        <Tab.Screen name="Profile" component={ProfileStack}/>
    </Tab.Navigator>
  )
}

export default BottomTabNavigator