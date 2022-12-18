import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Touchable, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from '../firebase'
import useAuth from '../hooks/useAuth';
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
    const {user, logout} = useAuth();
    const navigation = useNavigation()

    //const user_email = user.email

    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert("password reset email sent")
        }).catch((error) => {
            alert(error)
        })
    }


    return (
        <SafeAreaView>
            <View className="flex-row pb-3 justify-between mx-4 space-x-2">
                {/* Header with title and search bar */}
                <Text className="font-bold text-3xl ">
                Settings Page
                </Text>
            </View>
            <TouchableOpacity onPress={() => {changePassword()}}>
                <Text className="flex-row pb-3 justify-between mx-4 space-x-2 font-bold text-xl">
                    Send password change request
                </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                <Text className="flex-row pb-3 justify-between mx-4 space-x-2 font-bold text-xl">
                    Go Back
                </Text>
            </TouchableOpacity>

            <View className="flex justify-center items-center top-10">
                <Text className="text-red-400">
                Hello, {user?.uid}!
                </Text>
                <Button title="Sign out" className="mt-10" onPress={logout}/>
            </View>
        </SafeAreaView>
    )
}
export default Settings