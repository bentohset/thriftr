import { View, Text ,Button, SafeAreaView, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect , useState } from 'react'
import { auth, firebase } from '../firebase';
import useAuth from "../hooks/useAuth";
import { signOut, getAuth } from 'firebase/auth';
import { Icon } from '@rneui/themed';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {user, logout} = useAuth();

    return (
        <SafeAreaView>
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Text className="font-bold text-3xl">
                    Discover
                </Text>
            </View>
            <View className="flex justify-center items-center">
                <Text className="text-red-400">
                    Hello, {user?.uid}!
                </Text>
                <Button title="Sign out" className="mt-10" onPress={logout}/>
            </View>

        </SafeAreaView>
    )
}


export default HomeScreen