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
import AppContext from '../components/AppContext';
import { Image } from 'react-native-elements';

const ConfigureProfileScreenTags = () => {

  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const {user, configurationState} = useAuth();
  const myContext = useContext(AppContext);
  
  

  function configProfileTags(){
  }

  return (
    <SafeAreaView className="flex-1" >
       <View className="p-4 mt-20">
            <Text className="font-bold text-5xl">
                Almost there!
            </Text>
            <Text className="font-bold text-lg leading-loose mt-5">
                Now, please select up to 3 tags that you are interested in!
            </Text>
        </View>

        <View className = "flex-1 justify center flex-row">
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600" >
                <Image className="relative left-4 top-4 h-32 w-32" source={require('../assets/icons/t-shirt.png')} />
                <Text className="relative text-center -top-20 font-semibold opacity-75" >Tees</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600 mx-20" >
                <Image className="relative left-4 top-4 h-32 w-32" source={require('../assets/icons/cargo.png')} />
                <Text className="relative text-center -top-20 font-semibold opacity-75" >Cargos</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600 "  >
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/vintage.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Vintage</Text>
            </TouchableOpacity>
        </View>

        <View className = "flex justify center flex-row  " >
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600" >
                <Image className="relative left-4 top-4 h-32 w-32" source={require('../assets/icons/jeans.png')} />
                <Text className="relative text-center -top-20 font-semibold opacity-75" >Jeans</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600 mx-20" >
                <Image className="relative left-4 top-4 h-32 w-32" source={require('../assets/icons/dress.png')} />
                <Text className="relative text-center -top-20 font-semibold opacity-75" >Dresses</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600 "  >
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/crop-top.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Crop Tops</Text>
            </TouchableOpacity>
        </View>
      
        <View className = "flex justify center flex-row mb-10 " >
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600" >

                <Image className="relative left-6 top-6 h-28 w-28" source={require('../assets/icons/watch.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Accessories</Text>
            </TouchableOpacity>
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600 mx-20" >
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/skirt.png')} />
                <Text className="relative  text-center -top-12 font-semibold opacity-75" >Skirts</Text>  
                <View className= "relative  -top-60 h-40 w-40 rounded-full bg-black opacity-50" >
                </View>
            </TouchableOpacity>
            <TouchableOpacity className=" h-40 w-40 rounded-full bg-slate-600  "  >
                <Image className="relative left-6 top-5 h-28 w-28 " source={require('../assets/icons/shoes.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Shoes</Text>
                <View className= "relative  -top-60 h-40 w-40 rounded-full bg-black opacity-50" ></View>
            </TouchableOpacity>
        </View> 
        <View className="flex items-center justify-center pt-5">
            <TouchableOpacity className=" bg-[#5b5b5b] w-11/12 p-4 rounded-2xl"
             onPress={() => navigation.navigate('Tabs')}
            >
                <Text className="text-white text-center font-semibold">Continue</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ConfigureProfileScreenTags
    