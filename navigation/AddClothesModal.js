/* 

Modal screen to add clothes for sale

*/
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView, Button, Image, TouchableWithoutFeedback} from 'react-native'
import React, {useState, useRef, useCallback} from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import useAuth from "../hooks/useAuth";
import { doc, updateDoc, setDoc, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import LoadingButton from '../components/LoadingButton';

const AddClothesModal = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [error, setError] = useState(null);

  const [clothingName, setClothingName] = useState('');
  const [price, setPrice] = useState('');
  const [conditionValue, setConditionValue] = useState(null);
  const [condition, setCondition] = useState([
    { label: "Brand new", value: "Brand New" },
    { label: "Like new", value: "Like New" },
    { label: "Slightly used", value: "Slightly Used" },
    { label: "Well used", value: "Well Used" },
    { label: "Very used", value: "Very Used" },
  ]);
  const [sizeValue, setSizeValue] = useState(null);
  const [size, setSize] = useState([
    { label: "XXS", value: "XXS" },
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
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
    const url = await uploadImage()
    let obj = {
      clothing: clothingName,
      price: price,
      condition: conditionValue,
      size: sizeValue,
      user: user.uid,
      photoURL: url
    }
    const userRef = doc(db,"users", user.uid, "listings",clothingName)
    const clotheRef = doc(db,"clothes", clothingName)
    setDoc(clotheRef,obj)
    .then(setDoc(userRef, obj))     //adds the clothing object under user so that profile can call it
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
    <SafeAreaView className="flex-1 bg-white">
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
        <Text className="font-semibold m-1">Clothing Name</Text>
        <TextInput 
          className="border-2 border-[#DADADA] bg-transparent w-full h-14 m-2 p-4 rounded-xl"
          value={clothingName}
          onChangeText={(clothingName) => setClothingName(clothingName)}        
          autoCorrect={false}
          autoCapitalize={true}
          placeholder="Name your clothing" 
        />

        <Text className="font-semibold m-1">Condition</Text>
        <DropDownPicker
          props={{activeOpacity:1}}
          className="w-full h-14 rounded-xl m-2"
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
      
        <Text className="font-semibold m-1">Price</Text>
        <View className="border-2 border-[#DADADA] bg-transparent w-full h-14 m-2 p-4 rounded-xl flex-row items-center">
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

        <Text className="font-semibold m-1">Size</Text>
        <DropDownPicker
          props={{activeOpacity:1}}
          style={styles.drop}
          className="w-full h-14 rounded-xl m-2"
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

        <Text className="font-semibold m-1">Photo</Text>
        <TouchableWithoutFeedback onPress={pickImage} className="">
          {image===null ?  
          <View className="w-full aspect-square border-2 border-[#DADADA] bg-transparent rounded-xl m-2 p-4 border-box flex items-center justify-center">
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
        <LoadingButton
          classStyle="w-11/12 p-4 rounded-2xl items-center justify-center"
          onPress={()=>{
            submitForm();
          }}
          text="Add"
          requirements={clothingName && price && conditionValue && size}
        />
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
    borderWidth: 2,
    borderColor: "#DADADA",
    backgroundColor: "white",
    margin: 8,
    borderRadius: 5,
  },
  drop:{
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#DADADA",
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