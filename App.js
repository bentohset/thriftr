/*
main App javascript
Houses navigation containers and authentication wrapped in stack navigation
stack navigator in seperate file
*/


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //ignore log notification by message (for now)
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
  
}