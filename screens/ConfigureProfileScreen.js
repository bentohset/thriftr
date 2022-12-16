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
    const docRef = doc(db,"users", user.uid);
    setDoc(docRef,{
      full_name: fullName,
      user_name: userName,
      uid: user.uid,
      email: user.email,
    })
    .then(()=>{navigation.navigate('ConfigureProfileScreenAge')})   //put the navigate within the function so it will only navigate when there is a value
    .catch ((error)=>{setError(error)})
  }

  return (
    <SafeAreaView className="flex-1">
      {!!error && 
        <View 
          className="flex justify-center self-center absolute bottom-36 opacity-90 z-10 p-4 bg-[#D54826FF] rounded-2xl"
        >
          <Text className="text-white">
              {error}
          </Text>
        </View>
      }
      <View className="p-4 mt-20">
        <Text className="font-bold text-5xl leading-loose">
          You're In!
        </Text>
        
        <Text className="font-bold text-lg leading-loose mt-5">
          Now, please tell us your name.
        </Text>
      </View>

      <View className="flex-1 items-start p-2 pr-8 m-1 mt-10">
        <Text className="font-semibold m-1">Full Name</Text>
        <TextInput 
          className="bg-[#D9D9D9] w-full h-12 m-2 p-4 rounded-xl"
          value={fullName} 
          onChangeText={(fullName) => setFullName(fullName)} 
          autoCorrect={false}
          placeholder="John Appleseed" 
        />
        <Text className="font-semibold m-1">Username</Text>
        <TextInput 
          placeholder="Username" 
          className="bg-[#D9D9D9] w-full h-12 m-2 p-4 rounded-xl"
          value={userName} 
          onChangeText={(userName) => setUserName(userName)} 
          autoCorrect={false}
          autoCapitalize={false}
        />
      </View>
      <View className="flex items-center justify-center p-4">
        <TouchableOpacity
          className="bg-[#5b5b5b] w-full p-4 rounded-2xl"
          onPress={()=>{
            configProfileName();
            
          }}
        >
          <Text className="text-white text-center font-semibold">
            Continue
          </Text>
        </TouchableOpacity>
        {/* <Text className="font-semibold underline text-center mt-4" onPress={()=>navigation.navigate('Home')}>
          Skip
        </Text> */}
      </View>
    </SafeAreaView>
  )
}

export default ConfigureProfileScreen