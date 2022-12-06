/*
The log in screen
*/

import { View, Text , Button, StyleSheet, TextInput, TouchableOpacity, SafeAreaView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, {useState, useLayoutEffect} from 'react'
import { auth, firebase } from "../firebase";
import useAuth from '../hooks/useAuth';
import { signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import { Icon } from "react-native-elements";


const LoginScreen = () => {
  //const{ signInWithGoogle } = useAuth();      //use google as authentication
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');

  async function logIn(){
    if (email === '' || password === '') {
      setError('Email and password must be provided');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email,password);
    } catch (error) {
      setError(error.message);
    }
  }



  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <TouchableOpacity className="absolute left-10 top-20 bg-[#D9D9D9] p-3 rounded-xl mb-10" onPress={() => navigation.goBack()} >
        <Icon name="chevron-left" color="#444"/>
      </TouchableOpacity>
      <Text className="absolute font-bold text-5xl left-10 top-40 leading-loose">
        Welcome {'\n'}Back
      </Text>

      {!!error && <View
        className="absolute opacity-90 z-10 p-4 bg-[#D54826FF] rounded-2xl bottom-3/4"
      ><Text>{error}</Text></View>}

      <Text className="right-1/3 font-semibold">Your Email</Text>
      <TextInput
        className="bg-[#D9D9D9] w-5/6 h-12 m-4 p-4 rounded-xl"
        placeholder="example@mail.com" 
        value={email} 
        onChangeText={(email) => setEmail(email)} 
        autoCapitalize="none" 
        autoCorrect={false} 
        keyboardType="email-address"
      />

      <Text className="right-1/3 font-semibold">Password</Text>
      <TextInput 
        className="bg-[#D9D9D9] w-5/6 h-12 m-4 p-4 rounded-xl"
        placeholder="Password" 
        value={password} 
        onChangeText={(password) => setPassword(password)} 
        autoCapitalize="none" 
        autoCorrect={false} 
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={logIn}
        className="absolute bottom-24 bg-[#5b5b5b] w-5/6 p-4 rounded-2xl"
      >
        <Text className="text-white text-center font-semibold">Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default LoginScreen;