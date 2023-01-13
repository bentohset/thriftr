import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Touchable, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from 'react-native-elements'
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
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-4 bg-white">
                <View className="flex-row pb-6 justify-between m-1 mx-4 space-x-2">
                    {/* Header with title and search bar */}
                    <Text className="font-bold text-3xl">
                    Settings Page
                    </Text>
                    <TouchableOpacity
                        className="rounded-xl z-10 mx-2"
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="x" type="octicon" size={30}/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity className="px-4 pb-4 border-b rounded-xl border-gray-200 justify-between flex-row" onPress={() => {changePassword()}}>
                    <Text className="font-bold text-xl">
                        Send password change request
                    </Text>
                    <Icon name="chevron-right" color="#000"/>
                </TouchableOpacity>

                <TouchableOpacity className="p-4 border-b rounded-xl border-gray-200 justify-between flex-row" onPress={logout}>
                    <Text className="font-bold text-xl">Sign out</Text>
                    <Icon name="chevron-right" color="#000"/>
                </TouchableOpacity>

                <View className="flex justify-center items-center m-10">
                    <Text className="text-semibold text-gray-500">
                    UID: {user?.uid}!
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Settings