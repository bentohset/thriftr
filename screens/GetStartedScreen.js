/*
Get started screen
for users who just installed the app
for onboarding
*/
import { View, Text, TouchableOpacity, Image} from 'react-native'
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
            <Image style={{height:85, width:125}} resizeMode="cover" source={require('../assets/designs/thriftrlogo_green.png')}/>
            <Text className="p-2.5 font-semibold text-lg">Find your fit today</Text>
            <TouchableOpacity
                onPress={()=>navigation.navigate('Registration')}
                className="absolute bottom-24 bg-[#39C7A5] w-5/6 p-4 rounded-2xl"
            >
                <Text className="text-white text-center font-semibold">Get started</Text>
            </TouchableOpacity>
            <View className="flex-1 absolute bottom-16">
                <Text className="font-semibold">Already have an account? <Text className="font-semibold underline text-[#39C7A5]" onPress={()=>navigation.navigate('Login')}>Log in</Text></Text>
            </View> 
        </View>
    )
}

export default GetStartedScreen