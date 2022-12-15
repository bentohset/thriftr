/*
Configure profile screen after registering with email or google

set full name and username then send to firebase firestore
*/
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import useDocExists from '../hooks/useDocExists';
import AppContext from '../components/AppContext';

const ConfigureProfileScreen = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const {user, configurationState} = useAuth();
  const myContext = useContext(AppContext);


  function configProfileName(){
    if (fullName === '' || userName === '') {
      setError('fullname and username are required');
      return;
    }
    try{
      const docRef = doc(db,"users", user.uid);
      setDoc(docRef,{
        full_name: fullName,
        user_name: userName,
        uid: user.uid,
        email: user.email,
      })
    } catch (error){
      setError(error);
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="absolute font-bold text-5xl left-10 top-40 leading-loose">
        You're In!
      </Text>
      {!!error && 
        <View 
          className="absolute top-72 opacity-90 z-10 p-4 bg-[#D54826FF] rounded-2xl"
        >
          <Text className="text-white">
              {error}
          </Text>
        </View>
      }

      <Text className="absolute font-bold text-lg left-12 top-60 leading-loose">
        Now, please tell us your name.
      </Text>


      
      <Text className="right-1/3 font-semibold">Full Name</Text>
      <TextInput 
        className="bg-[#D9D9D9] w-5/6 h-12 m-4 p-4 rounded-xl"
        value={fullName} 
        onChangeText={(fullName) => setFullName(fullName)} 
        autoCorrect={false}
        placeholder="John Appleseed" 
      />
      <Text className="right-1/3 font-semibold">Username</Text>
      <TextInput 
        placeholder="username" 
        className="bg-[#D9D9D9] w-5/6 h-12 m-4 p-4 rounded-xl"
        value={userName} 
        onChangeText={(userName) => setUserName(userName)} 
        autoCorrect={false}
        autoCapitalize={false}
      />
      <TouchableOpacity
        className="absolute bottom-24 bg-[#5b5b5b] w-5/6 p-4 rounded-2xl"
        onPress={()=>{
          configProfileName();
          navigation.navigate('ConfigureProfileScreenAge')
        }}
      >
        <Text className="text-white text-center font-semibold">Continue</Text>
      </TouchableOpacity>
      <Text className="font-semibold underline" onPress={()=>navigation.navigate('Home')}>
        Skip</Text>
    </SafeAreaView>
  )
}

export default ConfigureProfileScreen