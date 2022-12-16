/*
Configure profile screen after registering with email or google

set full name and username then send to firebase firestore
*/
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useCallback } from 'react';
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
 
  const onopenAge = useCallback(() => {
    setOpenGender(false);
  }, []);

  const onopenGender = useCallback(() => {
    setOpenAge(false);
  }, []);

  

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
    <SafeAreaView className="flex-1">
      {!!error && 
        <View 
          className="absolute top-72 opacity-90 z-10 p-4 bg-[#D54826FF] rounded-2xl"
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
          Now, please tell us your age and gender.
        </Text>
      </View>

      <View className="flex-1 items-start p-2 pr-8 m-1 mt-10">
        <Text className="font-semibold m-1">
          Your Age
        </Text>
        <DropDownPicker
          props={{activeOpacity:1}}
          className="w-full h-12 rounded-xl m-2"
          style={styles.drop}
          placeholderStyle={styles.placeholderStyle}
          dropDownContainerStyle={styles.dropDown}
          textStyle={styles.textDrop}
          open={openAge}
          value={userAgeValue}
          items={userAge}
          setOpen={setOpenAge}
          setValue={setUserAgeValue}
          setItems={setUserAge}
          onOpen={onopenAge}
          placeholder="Please Select Age"
          zIndex={3000}
          zIndexInverse={1000}
        />

        <Text className="font-semibold m-1">
          Your Gender
        </Text>
        <DropDownPicker
          props={{activeOpacity:1}}
          className="w-full h-12 rounded-xl m-2"
          style={styles.drop}
          placeholderStyle={styles.placeholderStyle}
          dropDownContainerStyle={styles.dropDown}
          textStyle={styles.textDrop}
          open={openGender}
          value={userGenderValue}
          items={userGender}
          setOpen={setOpenGender}
          setValue={setUserGenderValue}
          setItems={setUserGender}
          onOpen={onopenGender}
          placeholder = "Please Select Gender"
          zIndex={2000}
          zIndexInverse={2000}
        />
      </View>

      <View className="flex items-center justify-center p-4">
        <TouchableOpacity
          className="bg-[#5b5b5b] w-full p-4 rounded-2xl"
          onPress={()=>{
            configProfileAge();
            if (userAgeValue){
              navigation.navigate('ConfigureProfileScreenTags');
            }
          }}
        >
          <Text className="text-white text-center font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ConfigureProfileScreenAge


const styles = StyleSheet.create({
  placeholderStyle: {
    color: "grey",
    marginLeft: 4,
  },
  dropDown:{
    borderWidth: 0,
    backgroundColor: "#D9D9D9",
    margin: 8,
    borderRadius: 5,
  },
  drop:{
    backgroundColor: "#D9D9D9",
    borderWidth: 0,
    margin: 0,
  },
  textDrop:{
    marginLeft: 4,
    borderBottomWidth:1,
  },
  contentContainer:{
    flexGrow:1,
  }
})