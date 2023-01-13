import { View, Text, SafeAreaView, PixelRatio, Button, TouchableOpacity, ScrollView, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import useAuth from '../hooks/useAuth';
import { Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { doc, collection, onSnapshot, updateDoc, setDoc, addDoc, query, where, getDocs, getDoc, FieldPath,   } from "firebase/firestore";
import { auth, firebase, db } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Feather } from "@expo/vector-icons";


const Item = ({ title, image }) => (
  <TouchableOpacity 
    onPress={()=>{console.log(title)}} 
    className="items-center justify-center border-white border-[1px] w-1/3 aspect-square" >
    <Image source={{uri: image}} style={{width:'100%', height:'100%'}} />
  </TouchableOpacity>
);


const ProfileScreen = () => {
  const {user} = useAuth();
  const navigation = useNavigation()
  //console.log(user.uid)
  const [refreshing, setRefreshing] = useState(false);
  const stickyRef = useRef(null);

  const [image, setImage] = useState(null);
  const[FullName, setFullName] = useState('');
  const[UserName, setUserName] = useState('');
  const[Likes, setLikes] = useState('');
  const[Followers, setFollowers] = useState('');
  const[Following, setFollowing] = useState('');
  const[Description, setDescription] = useState('');
  const [listings, setListings] = useState([]);

  const onRefresh = () => {
    setRefreshing(true)
    setImage(null);
    setFullName('');
    setUserName('');
    setDescription('');
    fetchData();
    setRefreshing(false)
    console.log("refreshed")
  }

  const renderItem = ({ item }) => (
    <Item 
      title={item.clothing} 
      image={item.photoURL}/>
  );

  const fetchData = () =>{
    onSnapshot(doc(db,"users",user.uid),(doc)=>{
      setFullName(doc.data().full_name);
      setUserName(doc.data().user_name);
      setDescription(doc.data().description);
    })
    onSnapshot(doc(db,"users",user.uid,"listings"),snapshot=>{
      setListings(
        snapshot.docs.map(doc=>({
          id:doc.id,
          ...doc.data(),
        }))
      )
    })
    getImage();
  }

  useEffect(() => {
    let unsub;
    let unsub2;
    const fetchData = async () => {
      // onSnapshot(doc(db,"users",user.uid,"listings"),snapshot=>{
      //   setListings(
      //     snapshot.docs.map(doc=>({
      //       id:doc.id,
      //       ...doc.data(),
      //     }))
      //   )
      // })
      getImage()
      unsub = onSnapshot(doc(db,"users",user.uid),(doc)=>{
        setFullName(doc.data().full_name);
        setUserName(doc.data().user_name);
        setDescription(doc.data().description);
        setLikes(doc.data().likes);
        setFollowers(doc.data().followers);
        setFollowing(doc.data().following);
      })
      unsub2 = onSnapshot(collection(db,"users",user.uid,"listings"),(snapshot)=>{
        setListings(
          snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data(),
          }))
        )
      })
    }
    fetchData();
    return ()=>{
      unsub;
      unsub2;
    }
  },[])

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


// const getFullName = async () =>{
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   return setFullName(docSnap.data().full_name)
// }

// const getUserName = async () =>{
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   return setUserName(docSnap.data().user_name)
// }

// const getLikes = async () =>{
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   return setLikes(docSnap.data().likes)
// }

// const getFollowers = async () =>{
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   return setFollowers(docSnap.data().followers)
// }

// const getFollowing = async () =>{
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   return setFollowing(docSnap.data().following)
// }

// const getDescription = async () =>{
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   return setDescription(docSnap.data().description)
// }

// getImage()
// getFullName()
// getUserName()
// getLikes()
// getDescription()
// getFollowers()
// getFollowing()

const header = () =>{
  return(
    <View className="flex-1 bg-gray-100">


      <View className="flex-row bottom-0 left-7">
        {/* profile pic */}
        <View
          className="items-center justify-center h-24 w-24 rounded-full bg-black overflow-hidden"
        >
        <Image className="h-28 w-28 absolute opacity-90"
            source = {{uri: image}}
        />
        </View>

        {/* following */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="items-center justify-center left-12"
        >
          <Text className="font-medium">
            {Following}
          </Text>
          <Text className="font-light text-xs">
            following
          </Text>
        </TouchableOpacity>

        {/* followers */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="items-center justify-center left-16"
        >
          <Text className="font-medium">
            {Followers}
          </Text>
          <Text className="font-light text-xs">
            Followers
          </Text>
        </TouchableOpacity>

        {/* likes */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="items-center justify-center left-20 "
        >
          <Text className="font-medium">
            {Likes}
          </Text>
          <Text className="font-light text-xs">
            Likes
          </Text>
        </TouchableOpacity>

        {/* separator */}
        <Text className="font-thin text-2xl justify-center left-10 top-6">
          |
        </Text>
        <Text className="font-thin text-2xl justify-center right-8 top-6">
          |
        </Text>
      </View>

      {/* full name */}
      <View className="flex-row pb-3 items-center mx-7 space-x-2 top-2">
        <Text className="font-bold text-xl">
          {FullName}
        </Text>
      </View>

      {/* bio */}
      <View className="flex-row pb-3 items-center mx-7 space-x-2 bottom-1">
        <Text className="font-light text-sm">
          {Description}
        </Text>
      </View>

      <View className="flex flex-row bottom-0 left-6 h-7">
        {/* edit profile button */}
        <TouchableOpacity 
          onPress={() => navigation.navigate("EditProfile", {'paramPropKey': 'paramPropValue'})}
          className="basis-9/12 items-center justify-center rounded-md bg-[#39C7A5]">
            <Text className="text-white font-semibold">
              edit profile
            </Text>
        </TouchableOpacity>

        {/* share button */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="basis-1/12 items-center justify-center left-3 rounded-md bg-[#39C7A5]">
            <View className="items-center justify-center">
              <Icon name="reply" color="white" size="20"/>
            </View>
        </TouchableOpacity>
      </View>
        
      <View className="flex flex-row justify-evenly my-2" ref={stickyRef} style={{position: "sticky", top: 0}}>
        {/* my clothes */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="items-center justify-center">
            <View className="items-center justify-center">
              <Icon name="ios-shirt-outline" type="ionicon" size="25"/>
            </View>
        </TouchableOpacity>

        {/* likes */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className=" items-center justify-center "
        >
          <View className="items-center justify-center">
          <Icon name="heart" type="feather" size="25"/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

  return (
    
    <SafeAreaView className="flex-grow bg-gray-100">
      <View className="flex-row pb-3 justify-between mx-7 space-x-2">
        {/* Header with title and search bar */}
        <Text className="font-bold text-3xl">
        {UserName}
        </Text>

        {/* Menu button */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('SettingsScreen')}
          className="items-right justify-center rounded-full w-10 h-15">
            <View className="items-center justify-center">
              <Icon name="menu" color="black" size="30"/>
            </View>
        </TouchableOpacity>

      </View>
      

      {/* all clothes */}

      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        ListHeaderComponent={header}
        stickyHeaderIndices={[0]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

const products = [
  {
      clothingName:"Shirt with stripes",
      size: "XL",
      price: 5,
      condition:"unused",
      photoURL:"https://github.com/twbs.png",
      id: 1,
  },
  {
      clothingName:"Buttoned Shirt",
      size: "S",
      price: 12,
      condition:"used",
      photoURL:"https://github.com/npm.png?size=200",
      id: 2,
  },
  {
      clothingName:"Shirt Oversized-fit",
      size: "L",
      price: 10,
      condition:"Worn",
      photoURL:"https://github.com/github.png?size=40",
      id:3,
  },
  {
    clothingName:"Shirt1 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:4,
  },
  {
    clothingName:"Shirt2 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:5,
  },
  {
    clothingName:"Shirt3 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:6,
  },
  {
    clothingName:"Shirt4 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:7,
  },
  {
    clothingName:"Shirt5 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:8,
  },
  {
    clothingName:"Shirt6 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:4,
  },
  {
    clothingName:"Shirt7",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:9,
  },
  {
    clothingName:"Shirt8 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:10,
  },
  {
    clothingName:"Shirt9 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:11,
  },
  {
    clothingName:"Shirt10 ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:12,
  }
];

export default ProfileScreen
