/*
main App javascript
Houses navigation containers and authentication wrapped in stack navigation
stack navigator in seperate file
*/


import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //ignore log notification by message (for now)
import { AuthProvider } from './hooks/useAuth';
import AppContext from './components/AppContext';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  // const [configProfile, setConfig] = useState(false);



  // const userSettings = {
  //   profileConfigured: configProfile,
  //   setConfig,
  // };

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="dark" />
        <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
  
}