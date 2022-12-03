import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Touchable } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from '../config'
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('')

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
            <TouchableOpacity onPress={() => {firebase.auth().signOut()}}>
                <Text>
                    Sign out
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text>
                    settings
                </Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}
export default Dashboard