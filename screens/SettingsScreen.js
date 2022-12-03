import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Touchable } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from '../firebase'
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('')


    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert("password reset email sent")
        }).catch((error) => {
            alert(error)
        })
        
    }

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            }
            else {
                console.log('User does not exist')
            }
        })
    }, [])

    return (
        <SafeAreaView>
            <Text>
                Hello, {name.firstName}
            </Text>
            <TouchableOpacity onPress={() => {changePassword()}}>
                <Text>
                    Send password change request
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Text>
                    Dashboard
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Settings