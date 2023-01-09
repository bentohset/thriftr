/*
stack navigator file, link from app.js
what is navigatable by profiles who are logged in/ not logged in
*/

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect, useContext } from 'react';
import useAuth from "../hooks/useAuth";
import useDocExists from '../hooks/useDocExists';
import { View } from 'react-native';
import AppContext from '../components/AppContext';
import LoginScreen from '../screens/LoginScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import ConfigureProfileScreen from '../screens/ConfigureProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AddClothesModal from './AddClothesModal';
import ConfigureProfileScreenAge from '../screens/ConfigureProfileScreenAge';
import ConfigureProfileScreenTags from '../screens/ConfigureProfileScreenTags';
import SettingsScreen from '../screens/SettingsScreen'


const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
  const { user, configState } = useAuth();

  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (  
        <>
          <Stack.Group screenOptions={{ headerShown: false, presentation: 'fullScreenModal', animationEnabled: false }}>
            <Stack.Screen name="Tabs" component={BottomTabNavigator} />
            <Stack.Screen name="AddClothesModal" component={AddClothesModal} options={{ animationEnabled: true }}/>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="ConfigureProfile" component={ConfigureProfileScreen} />
            <Stack.Screen name="ConfigureProfileScreenAge" component={ConfigureProfileScreenAge} />
            <Stack.Screen name="ConfigureProfileScreenTags" component={ConfigureProfileScreenTags} />

          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component = {RegistrationScreen} />
          <Stack.Screen name = "ForgetPassword" component = {ForgetPasswordScreen}/>
          
        </>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator;