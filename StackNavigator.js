/*
stack navigator file, link from app.js
what is navigatable by profiles who are logged in/ not logged in
*/

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';


import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import SettingsScreen from './screens/SettingsScreen';
import useAuth from "./hooks/useAuth"
import GetStartedScreen from './screens/GetStartedScreen';
import ConfigureProfileScreen from './screens/ConfigureProfileScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () =>{
  const { user } = useAuth();
  
  
    return(
      //TODO: only direct to configureprofile screen if user username and fullname is not configured
      //<Stack.Screen name="ConfigureProfile" component={ConfigureProfileScreen} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name = "Settings" component = {SettingsScreen} />
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