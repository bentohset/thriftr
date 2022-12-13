/* 

Modal screen to add clothes for sale

*/
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView, Button, Image, TouchableWithoutFeedback} from 'react-native'
import React, {useState, useRef, useCallback} from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import useAuth from "../hooks/useAuth";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const AddClothesModal = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [error, setError] = useState(null);

  const [clothingName, setClothingName] = useState('');
  const [price, setPrice] = useState('');
  const [conditionValue, setConditionValue] = useState(null);
  const [condition, setCondition] = useState([
    { label: "Brand new", value: "brandnew" },
    { label: "Like new", value: "likenew" },
    { label: "Slightly used", value: "slightlyused" },
    { label: "Well used", value: "wellused" },
    { label: "Very used", value: "veryused" },
  ]);
  const [sizeValue, setSizeValue] = useState(null);
  const [size, setSize] = useState([
    { label: "XXS", value: "xxs" },
    { label: "XS", value: "xs" },
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "L", value: "l" },
    { label: "XL", value: "xl" },
    { label: "XXL", value: "xxl" },
  ]);

  const [openCondition, setOpenCondition] = useState(false);
  const [openSize, setOpenSize] = useState(false);

  //close other dropdown if one dropdown is open, ensures only one dropdown is open at all times
  const onopenCondition = useCallback(() => {
    setOpenSize(false);
  }, []);

  const onopenSize = useCallback(() => {
    setOpenCondition(false);
  }, []);

  async function submitForm(){
    if (clothingName === '') {
      setError('Name required');
      return;
    }
    if (price === '') {
      setError('Price required');
      return;
    }
    if (conditionValue === null) {
      setError('Condition required');
      return;
    }
    if (size === null) {
      setError('Size required');
      return;
    }
    const docRef = doc(db,"clothes", clothingName)
    const url = await uploadImage()
    setDoc(docRef,{
      clothing: clothingName,
      price: price,
      condition: conditionValue,
      size: sizeValue,
      user: user.email,
      photoURL: url
    })
    .then(()=>{navigation.goBack()
    })
    .catch ((error)=>{setError(error)})
  }

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,4],
    })
    const source = {uri: result.uri};
    console.log(source);
    setImage(source);
  }
  
  const uploadImage = async ()=>{
    setUploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function() {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function() {
    //     reject(new TypeError('Network request failed'));
    //   };
    //   xhr.responseType = 'blob';
    //   xhr.open('GET', uri, true);
    //   xhr.send(null);
    // });
    const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
    var fileRef = ref(storage, filename);
    const result = await uploadBytes(fileRef, blob)
    const url = await getDownloadURL(fileRef)
    console.log(url);
    blob.close();
    setUploading(false);
    return url;
  }
  

  return (
    <SafeAreaView className="flex-1">
      <View className="p-3 align-center">
        <TouchableOpacity
          className="absolute top-1 left-3 p-3 rounded-xl z-10"
          onPress={() => navigation.goBack()}
        >
          <Icon name="x" type="octicon" size={30}/>
        </TouchableOpacity>
      <Text className="font-bold text-3xl text-center">
        List Clothing
      </Text>
    </View>

      
    <ScrollView 
      nestedScrollEnabled={true} 
      keyboardDismissMode="on-drag" 
      contentContainerStyle={styles.contentContainer}
    >
      <View className="flex-1 flex-col items-start p-2 pr-8 m-1 mt-0">
        <Text className="font-semibold m-1 text-xl">Clothing Name</Text>
        <TextInput 
          className="bg-[#D9D9D9] w-full h-12 m-2 p-4 rounded-xl"
          value={clothingName}
          onChangeText={(clothingName) => setClothingName(clothingName)}        
          autoCorrect={false}
          placeholder="Name your clothing" 
        />

        <Text className="font-semibold m-1 text-xl">Condition</Text>
        <DropDownPicker
          props={{activeOpacity:1}}
          className="w-full h-12 rounded-xl m-2"
          style={styles.drop}
          open={openCondition}
          setOpen={setOpenCondition}
          value={conditionValue}
          items={condition}
          setValue={setConditionValue}
          setItems={setCondition}
          onOpen={onopenCondition}
          placeholder="Choose"
          zIndex={3000}
          zIndexInverse={1000}
          placeholderStyle={styles.placeholderStyle}
          dropDownContainerStyle={styles.dropDown}
          textStyle={styles.textDrop}
          listMode="SCROLLVIEW"
        />
      
        <Text className="font-semibold m-1 text-xl">Price</Text>
        <View className="bg-[#D9D9D9] w-full h-12 m-2 p-4 rounded-xl flex-row items-center">
          <Text className="font-semibold pr-1">S$</Text>
          <TextInput 
            className="w-full"
            value={price}
            onChangeText={(price) => setPrice(price)}        
            autoCorrect={false}
            placeholder="Price" 
            keyboardType='numeric'
            returnKeyType={ 'done' }
            prefix="$"
        />
        </View>

        <Text className="font-semibold m-1 text-xl">Size</Text>
        <DropDownPicker
          props={{activeOpacity:1}}
          style={styles.drop}
          className="w-full h-12 rounded-xl m-2"
          open={openSize}
          setOpen={setOpenSize}
          value={sizeValue}
          items={size}
          setValue={setSizeValue}
          setItems={setSize}
          onOpen={onopenSize}
          placeholder="Choose"
          zIndex={2000}
          zIndexInverse={2000}
          placeholderStyle={styles.placeholderStyle}
          dropDownContainerStyle={styles.dropDown}
          textStyle={styles.textDrop}
          listMode="SCROLLVIEW"
        />

        <Text className="font-semibold m-1 text-xl">Photo</Text>
        <TouchableWithoutFeedback onPress={pickImage} className="">
          {image===null ?  
          <View className="w-full aspect-square bg-[#D9D9D9] rounded-xl m-2 p-4 border-box flex items-center justify-center">
            <Icon type="octicon" name="plus" color="gray"/>
          </View>
          :
          <Image source={{uri: image.uri}} className="w-full aspect-square rounded-xl m-2 p-4"/>
          }
        </TouchableWithoutFeedback>
        

      </View>
    </ScrollView>
      {!!error && 
        <View 
          className="absolute top-72 opacity-90 z-10 p-4 bg-[#D54826FF] rounded-2xl"
        >
          <Text className="text-white">
              {error}
          </Text>
        </View>
      }
      <View className="flex items-center justify-center pt-5 border-t border-zinc-400">
        <TouchableOpacity
          className="bg-[#5b5b5b] w-11/12 p-4 rounded-2xl"
          onPress={()=>{
            submitForm();
          }}
        >
          <Text className="text-white text-center font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default AddClothesModal

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