import { View, Text ,Button, SafeAreaView, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect , useState } from 'react'
import { auth, firebase } from '../firebase';
import useAuth from "../hooks/useAuth";
import { signOut, getAuth } from 'firebase/auth';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {user, logout} = useAuth();

    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <Text className="text-red-400">
                Hello, {user?.uid}!
            </Text>
            <Button title="Sign out" className="mt-10" onPress={logout}/>

        </SafeAreaView>
    )
}


export default HomeScreen