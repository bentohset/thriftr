/*
Register by email
also offers continue with google
*/

import { View, Text, TextInput, StyleSheet , Button, TouchableOpacity} from "react-native";
import React, {useState, useEffect, useLayoutEffect} from "react";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { auth, firebase } from '../firebase'
import '@firebase/firestore';
import useAuth from "../hooks/useAuth";
import { doc, FieldValue } from "firebase/firestore";


const Registration = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {registerUser, loading} = useAuth();
    const navigation = useNavigation();
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    async function registration() {
        if (email === '' || password === '') {
            setError('Email and password are required');
            return;
        }
        try {
            registerUser(email, password);
            // .then(()=>{
            //     dbRoot.doc(user, user.uid)
            //     .set({
            //         email:email,
            //         display: displayName,
            //     })
            // })
        } catch (error) {
            setError(error.message);
        }
    }
    // registerUser = async (email, password, firstName, lastName) => {
    //     await firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then(() => {
    //         firebase.auth().currentUser.sendEmailVerification({
    //             handleCodeInApp: true,
    //             url:'https://thriftr-1e99d.firebaseapp.com',
    //         })
    //         .then(() => {
    //             alert('verification email sent')
    //         }).catch((error) => {
    //             alert.apply(error.message)
    //         })
    //         .then(() => {
    //             firebase.firestore().collection('users')
    //             .doc(firebase.auth().currentUser.uid)
    //             .set({
    //                 firstName,
    //                 lastName,
    //                 email,
    //             })
    //         })
    //         .catch((error) => {
    //             alert(error.message)
    //         })
    //     })
    //     .catch((error) => {
    //         alert(error.message)
    //     })
    //     console.log(firebase.auth().currentUser);
    // }

    return (
        <View className="flex-1 justify-center items-center">
            <TouchableOpacity className="absolute left-10 top-20 bg-[#D9D9D9] p-4 rounded-xl" onPress={() => navigation.goBack()} >
                <Text className="text-[#444]">Back</Text>
            </TouchableOpacity>
            <Text className="absolute font-bold text-5xl left-10 top-40 leading-loose">
                Create {'\n'}Account
            </Text>

            {!!error && 
                <View 
                    className="absolute opacity-90 z-10 p-4 bg-[#D54826FF] rounded-2xl bottom-3/4"
                >
                    <Text className="text-white">
                        {error}
                    </Text>
                </View>
            }
            
            <Text className="right-1/3 font-semibold">Your Email</Text>
            <TextInput 
                className="bg-[#D9D9D9] w-5/6 h-12 m-4 p-4 rounded-xl"
                placeholder="example@gmail.com"  
                value={email} 
                onChangeText={(email) => setEmail(email)} 
                autoCapitalize="none" 
                autoCorrect={false} 
                keyboardType="email-address"
            />
            <Text className="right-1/3 font-semibold">Password</Text>
            <TextInput 
                className="bg-[#D9D9D9] w-5/6 h-12 m-4 p-4 rounded-xl"
                placeholder="password" 
                value={password} 
                onChangeText={(password) => setPassword(password)} 
                autoCapitalize="none" 
                autoCorrect={false} 
                secureTextEntry={true}
            />
            <TouchableOpacity
                onPress={registration}
                className="absolute bottom-24 bg-[#5b5b5b] w-5/6 p-4 rounded-2xl"
            >
                <Text className="text-white text-center font-semibold">Create account</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Registration