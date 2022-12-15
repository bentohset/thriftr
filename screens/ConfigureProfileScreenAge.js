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
import DropDownPicker from 'react-native-dropdown-picker';

const ConfigureProfileScreenAge = () => {

  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const {user, configurationState} = useAuth();
  const myContext = useContext(AppContext);
  const[openAge, setOpenAge] = useState(false);
  const [userAgeValue, setUserAgeValue] = useState(null);
  const ages = [...Array(83).keys()].map((x) => x + 16);
  const [userAge, setUserAge] = useState(
    ages.map((age) => ({ label: age.toString(), value: age }))
  );
  const[openGender, setOpenGender] = useState(false);
  const [userGenderValue, setUserGenderValue] = useState(null);
  const [userGender, setUserGender] = useState([
    {label:'Male', value:'male'},
    {label:'Female', value:'female'},
  ])
 


  

  function configProfileAge(){
    if (userAgeValue === null ) {
      setError('Please Select Your Age');
      return;
    }
    try{
      const docRef = doc(db,"users", user.uid);
      setDoc(docRef,{
        user_age: userAgeValue,
      }
     ,{merge : true}
      )
    } catch (error){
      setError(error);
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center flex-col">
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
        Now, please tell us your age and gender.
      </Text>

      <Text className="absolute top-96 left-16 font-semibold m-0 ">Your Age</Text>

      <DropDownPicker
      className="absolute w-5/6 top-116 h-12 rounded-xl "
      zIndex={100}
      open={openAge}
      value={userAgeValue}
      items={userAge}
      setOpen={setOpenAge}
      setValue={setUserAgeValue}
      setItems={setUserAge}
      placeholder="Please Select Age"
    />

     <Text className="right-1/3 font-semibold">Your Gender</Text>

     <DropDownPicker
      className=" absolute w-5/6 h-12 rounded-xl top-0"
      zIndex={0}
      open={openGender}
      value={userGenderValue}
      items={userGender}
      setOpen={setOpenGender}
      setValue={setUserGenderValue}
      setItems={setUserGender}
      placeholder = "Please Select Gender"
    />

      <TouchableOpacity
        className="absolute bottom-24 bg-[#5b5b5b] w-5/6 p-4 rounded-2xl"
        onPress={()=>{
          configProfileAge();
          if (userAgeValue){
            navigation.navigate('ConfigureProfileScreenTags');
          }
        }}
      >
        <Text className="text-white text-center font-semibold">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ConfigureProfileScreenAge
    