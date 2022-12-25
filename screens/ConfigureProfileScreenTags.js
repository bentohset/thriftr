/*
Configure profile screen after registering with email or google

set full name and username then send to firebase firestore
*/
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Checkbox } from 'react-native'
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
  const [pressedShoe,setPressedShoe] = useState(false);
  const [opacityShoe, setOpacityShoe] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressedSkirt,setPressedSkirt] = useState(false);
  const [opacitySkirt, setOpacitySkirt] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressedAccessories,setPressedAccessories] = useState(false);
  const [opacityAccessories, setOpacityAccessories] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressedCropTop,setPressedCropTop] = useState(false);
  const [opacityCropTop, setOpacityCropTop] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressedDress,setPressedDress] = useState(false);
  const [opacityDress, setOpacityDress] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressedJeans,setPressedJeans] = useState(false);
  const [opacityJeans, setOpacityJeans] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressedVintage,setPressedVintage] = useState(false);
  const [opacityVintage, setOpacityVintage] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressedCargos,setPressedCargos] = useState(false);
  const [opacityCargos, setOpacityCargos] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressedTees,setPressedTees] = useState(false);
  const [opacityTees, setOpacityTees] = useState("relative  -top-60 h-40 w-40 rounded-full bg-black opacity-0")
  const [pressCount, setPressCount] = useState(0);
  
  const tags = [];
  function configTagArray(){

    if (pressedTees){
        tags.push('Tees')
    }
    if (pressedCargos){
        tags.push('Cargos')
    }
    if (pressedVintage){
        tags.push('Vintage')
    }
    if (pressedJeans){
        tags.push('Jeans')
    }
    if (pressedDress){
        tags.push('Dress')
    }
    if (pressedCropTop){
        tags.push('CropTop')
    }
    if (pressedAccessories){
        tags.push('Accessories')
    }
    if (pressedSkirt){
        tags.push('Skirt')
    }
    if (pressedShoe){
        tags.push('Shoes')
    }
}
    function configProfileTags(){
    const docRef = doc(db,"users", user.uid);
    setDoc(docRef,{
      Tags: tags,
    }
   ,{merge : true}
    )
  }



  

  return (
    <SafeAreaView className="flex-1  " >
       <View className="p-4 mt-20">
            <Text className="font-bold text-5xl">
                Almost there!
            </Text>
            <Text className="font-bold text-lg leading-loose mt-5">
                Now, please select up to 3 tags that you are interested in!
            </Text>
        </View>

        <View className = "flex justify center flex-row">
            
            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600" 
             onPress={()=>{
                if (pressedTees){     //if button pressed
                    setPressedTees(!pressedTees)        //make button not pressed
                    setOpacityTees("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                    setPressCount(pressCount-1);
                    console.log(pressCount);
                }

                else {              //button not pressed
                    if (pressCount < 3){
                        setPressedTees(!pressedTees)    //press button
                        setOpacityTees("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                        setPressCount(pressCount+1);
                        console.log(pressCount);
                    }
                    else{           //if pressedcount >=3 (limit reached)
                        <View  className="absolute top-72 opacity-90 z-10 p-4 bg-[#D54826FF] rounded-2xl">
                            <Text>
                                urmum
                            </Text>
                        </View>
                        console.log("exceeded")
                    }
                }}}> 
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/t-shirt.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Tees</Text>
                <View className= {opacityTees} ></View>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600 mx-20"
            onPress={()=>{

                if (pressedCargos){     //if button pressed
                    setPressedCargos(!pressedCargos)        //make button not pressed
                    setOpacityCargos("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                    setPressCount(pressCount-1);
                    console.log(pressCount);
                }

                else {              //button not pressed
                    if (pressCount < 3){
                        setPressedCargos(!pressedCargos)    //press button
                        setOpacityCargos("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                        setPressCount(pressCount+1);
                        console.log(pressCount);
                    }
                    else{           //if pressedcount >=3 (limit reached)
                        //display error
                    }
                }}}>  
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/cargo.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Cargos</Text>
                <View className= {opacityCargos} ></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600 "
            onPress={()=>{

                if (pressedVintage){     //if button pressed
                    setPressedVintage(!pressedVintage)        //make button not pressed
                    setOpacityVintage("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                    setPressCount(pressCount-1);
                    console.log(pressCount);
                }

                else {              //button not pressed
                    if (pressCount < 3){
                        setPressedVintage(!pressedVintage)    //press button
                        setOpacityVintage("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                        setPressCount(pressCount+1);
                        console.log(pressCount);
                    }
                    else{           //if pressedcount >=3 (limit reached)
                        //display error
                    }
                }}}>  
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/vintage.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Vintage</Text>
                <View className= {opacityVintage} ></View>
            </TouchableOpacity>

            </View>



            <View className = "flex justify center flex-row  " >

            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600 " 
            onPress={()=>{
                if (pressedJeans){     //if button pressed
                    setPressedJeans(!pressedJeans)        //make button not pressed
                    setOpacityJeans("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                    setPressCount(pressCount-1);
                    console.log(pressCount);
                }

                else {              //button not pressed
                    if (pressCount < 3){
                        setPressedJeans(!pressedJeans)    //press button
                        setOpacityJeans("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                        setPressCount(pressCount+1);
                        console.log(pressCount);
                    }
                    else{           //if pressedcount >=3 (limit reached)
                        //display error
                    }
                }}}> 
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/jeans.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Jeans</Text>
                <View className= {opacityJeans} ></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600 mx-20" 
           onPress={()=>{
            if (pressedDress){     //if button pressed
                setPressedDress(!pressedDress)        //make button not pressed
                setOpacityDress("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                setPressCount(pressCount-1);
                console.log(pressCount);
            }

            else {              //button not pressed
                if (pressCount < 3){
                    setPressedDress(!pressedDress)    //press button
                    setOpacityDress("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                    setPressCount(pressCount+1);
                    console.log(pressCount);
                }
                else{           //if pressedcount >=3 (limit reached)
                    //display error
                }
            }}}>  
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/dress.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Dresses</Text>
                <View className= {opacityDress} ></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600" 
             onPress={()=>{
                if (pressedCropTop){     //if button pressed
                    setPressedCropTop(!pressedCropTop)        //make button not pressed
                    setOpacityCropTop("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                    setPressCount(pressCount-1);
                    console.log(pressCount);
                }

                else {              //button not pressed
                    if (pressCount < 3){
                        setPressedCropTop(!pressedCropTop)    //press button
                        setOpacityCropTop("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                        setPressCount(pressCount+1);
                        console.log(pressCount);
                    }
                    else{           //if pressedcount >=3 (limit reached)
                        //display error
                    }
                }}}> 
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/crop-top.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Crop Tops</Text>
                <View className= {opacityCropTop} ></View>
            </TouchableOpacity>
        </View>
      
        <View className = "flex justify center flex-row mb-10 " >
            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600" 
            onPress={()=>{
                if (pressedAccessories){     //if button pressed
                    setPressedAccessories(!pressedAccessories)        //make button not pressed
                    setOpacityAccessories("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                    setPressCount(pressCount-1);
                    console.log(pressCount);
                }

                else {              //button not pressed
                    if (pressCount < 3){
                        setPressedAccessories(!pressedAccessories)    //press button
                        setOpacityAccessories("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                        setPressCount(pressCount+1);
                        console.log(pressCount);
                    }
                    else{           //if pressedcount >=3 (limit reached)
                        //display error
                    }
                }}}> 

                <Image className="relative left-6 top-6 h-28 w-28" source={require('../assets/icons/watch.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Accessories</Text>
                <View className= {opacityAccessories} ></View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600 mx-20" 
           onPress={()=>{
            if (pressedSkirt){     //if button pressed
                setPressedSkirt(!pressedSkirt)        //make button not pressed
                setOpacitySkirt("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                setPressCount(pressCount-1);
                console.log(pressCount);
            }

            else {              //button not pressed
                if (pressCount < 3){
                    setPressedSkirt(!pressedSkirt)    //press button
                    setOpacitySkirt("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                    setPressCount(pressCount+1);
                    console.log(pressCount);
                }
                else{           //if pressedcount >=3 (limit reached)
                    //display error
                }
            }}}> 
                <Image className="relative left-6 top-5 h-28 w-28" source={require('../assets/icons/skirt.png')} />
                <Text className="relative  text-center -top-12 font-semibold opacity-75" >Skirts</Text>  
                <View className= {opacitySkirt} >
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} className=" h-40 w-40 rounded-full bg-slate-600  " 
            onPress={()=>{
                if (pressedShoe){     //if button pressed
                    setPressedShoe(!pressedShoe)        //make button not pressed
                    setOpacityShoe("relative -top-60 h-40 w-40 rounded-full bg-black opacity-0")    //make tint dissapear
                    setPressCount(pressCount-1);
                    console.log(pressCount);
                }

                else {              //button not pressed
                    if (pressCount < 3){
                        setPressedShoe(!pressedShoe)    //press button
                        setOpacityShoe("relative -top-60 h-40 w-40 rounded-full bg-black opacity-50")
                        setPressCount(pressCount+1);
                        console.log(pressCount);
                    }
                    else{           //if pressedcount >=3 (limit reached)
                        //display error
                    }
                }}}> 
                <Image className="relative left-6 top-5 h-28 w-28 " source={require('../assets/icons/shoes.png')} />
                <Text className="relative text-center -top-12 font-semibold opacity-75" >Shoes</Text>
                <View className = {opacityShoe}></View>
            </TouchableOpacity>
        </View> 
        <View className="flex items-center justify-center pt-5">
            <TouchableOpacity className=" bg-[#5b5b5b] w-11/12 p-4 rounded-2xl "
            onPress={()=>{
                configTagArray();
                configProfileTags();
                setPressCount(0);
                navigation.navigate('Home');
                
            }}
            >
                <Text className="text-white text-center font-semibold">Continue</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ConfigureProfileScreenTags
    