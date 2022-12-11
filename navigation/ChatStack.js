import { View, Text } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
    return (
        <Stack.Navigator initialRouteName="Chat" screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default ChatStack