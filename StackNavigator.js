import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
    return(
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator