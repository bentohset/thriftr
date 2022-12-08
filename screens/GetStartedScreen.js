/*
Get started screen
for users who just installed the app
for onboarding
*/
import { View, Text, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
//import {useFonts} from 'expo-font'

const GetStartedScreen = () => {
    const navigation = useNavigation();

    // remove header of navigation
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
    
    return (
        <View className="flex-1 flex-col items-center justify-center">
            <Text className="font-bold text-3xl text-[#444] p-2.5">Thriftr</Text>
            <Text className="p-2.5 text-[#6A6A6A] text-xl">Find your fit today</Text>
            <TouchableOpacity
                onPress={()=>navigation.navigate('Registration')}
                className="absolute bottom-24 bg-[#5b5b5b] w-5/6 p-4 rounded-2xl"
            >
                <Text className="text-white text-center font-semibold">Get started</Text>
            </TouchableOpacity>
            <View className="flex-1 absolute bottom-16 text-[#444]">
                <Text>Already have an account? <Text className="font-semibold underline" onPress={()=>navigation.navigate('Login')}>Log in</Text></Text>
            </View> 
        </View>
    )
}

export default GetStartedScreen