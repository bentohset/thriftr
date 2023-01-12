import { Alert, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Touchable, Button, Image, TextInput} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from '@rneui/themed';
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'
import { doc, collection, onSnapshot, updateDoc, setDoc, addDoc, query, where, getDocs, getDoc, FieldPath,   } from "firebase/firestore";
import { auth, firebase, db } from '../firebase';
import useAuth from '../hooks/useAuth';
import LoadingButton from '../components/LoadingButton';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//testtest
const EditProfile = ({route}) => {
    //console.log(test)
    const navigation = useNavigation()
    const {user} = useAuth();
    
    useEffect(() => {
        getFullName()
        getUserName()
        getDescription()
        getImage()
     }, [route]);

    const[FullName, setFullName] = useState('');
    const getFullName = async () =>{
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        return setFullName(docSnap.data().full_name)
    }
    const[UserName, setUserName] = useState('');
    const getUserName = async () =>{
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        return setUserName(docSnap.data().user_name)
    }

    const[Description, setDescription] = useState('');
    const getDescription = async () =>{
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        return setDescription(docSnap.data().description)
    }



    const [image, setImage] = useState(null)
    const [imageNew, setImageNew] = useState(null)
    const [uploading, setUploading] = useState(false)
    

    const getImage = async () => {
        
        const storage = getStorage()
        try {
            const test = '/ProfilePics/' + user.uid
            const reference = ref(storage, test)
        
            await getDownloadURL(reference).then((x) => {
                setImage(x)
            })
        }catch {
            console.log("gjgj")
            const test = '/ProfilePics/' + 'default.png'
            const reference = ref(storage, test)
            await getDownloadURL(reference).then((x) => {
                setImage(x)
            })
        }
    }


    const chooseImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:  ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
            
        })
        const source = {uri: result.uri};
        //console.log(result)
        setImage(source.uri)
        setImageNew(source)
    };

    const uploadImage = async () => {
        //console.log('hidasdasdasd')
        const docRef = doc(db,"users", user.uid);
        updateDoc(docRef,{
          full_name: FullName,
          user_name: UserName,
          description: Description
        })

        if (imageNew != null) {

            const response = await fetch(imageNew.uri)
            const blob = await response.blob()
            const filename = user.uid
            var ref = firebase.storage().ref('ProfilePics/').child(filename).put(blob)
        
            try {
                await ref
            } catch (error) {
                console.log(e)
            }

        }
        
        Alert.alert(
            'Changes saved, refresh profile to see changes!'
        )
        //.then(()=>{navigation.navigate('ProfileScreen')})   //put the navigate within the function so it will only navigate when there is a value
      
        
        //navigation.navigate('Tabs')
    }


    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <TouchableOpacity className="absolute left-10 top-20 bg-[#D9D9D9] p-3 rounded-xl" onPress={() => navigation.goBack()} >
                <Icon name="chevron-left" color="#000"/>
            </TouchableOpacity>
            <Text className="absolute font-bold text-4xl left-37 top-16 leading-loose">
                Edit {'\n'}Account
            </Text>


            <TouchableOpacity 
                onPress={() => chooseImage()}
                className="items-center justify-center h-28 w-28 top-12 rounded-full bg-black overflow-hidden">
               <Image className="h-28 w-28 absolute opacity-90"
                    source = {{uri: image}}
                />
                
                <Feather name='camera' size={26} color='white' />
            </TouchableOpacity>

            <View className="items-start p-6 pr-6 m-1 mt-10 top-18">
            <Text className="font-semibold m-1">Full Name</Text>
            <TextInput 
            className="border-2 border-[#DADADA] bg-transparent w-52 h-14 my-2 p-4 rounded-xl"
            value={FullName} 
            onChangeText={(FullName) => setFullName(FullName)} 
            autoCorrect={false}
            placeholder='Full Name'
            />

            <Text className="font-semibold m-1">Username</Text>
            <TextInput 
              placeholder="Username" 
              className="border-2 border-[#DADADA] bg-transparent w-52 h-14 my-2 p-4 rounded-xl"
              value={UserName} 
              onChangeText={(UserName) => setUserName(UserName)} 
           autoCorrect={false}
            autoCapitalize={false}
            />

            <Text className="font-semibold m-1">Description</Text>
            <TextInput 
              placeholder="Description" 
              className="border-2 border-[#DADADA] bg-transparent w-80 h-20 my-2 p-4 rounded-xl"
              value={Description} 
              onChangeText={(Description) => setDescription(Description)} 
            autoCorrect={false}
            autoCapitalize={false}
            />
            </View>

            <View className="flex items-center justify-center px-7 mb-4">
            <LoadingButton
            classStyle="w-28 p-4 rounded-2xl justify-center items-center"
            onPress={uploadImage}
            text="Save"
            requirements={true}
            />
            </View>

        </SafeAreaView>
    )
}
export default EditProfile