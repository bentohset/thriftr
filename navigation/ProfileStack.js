import { View, Text } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Profile" 
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name = "Settings" component = {SettingsScreen} />
            <Stack.Screen name = "EditProfile" component = {EditProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStack