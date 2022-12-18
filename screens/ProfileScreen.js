import { View, Text, SafeAreaView, Button, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth';
import { Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";


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
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:4,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:5,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:6,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:7,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:8,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:4,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:9,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:10,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:11,
  },
  {
    clothingName:"Shirt ",
    size: "S",
    price: 12,
    condition:"Worn",
    photoURL:"https://github.com/github.png?size=40",
    id:12,
  }
];

const Item = ({ title, image }) => (
  <TouchableOpacity 
    onPress={console.log(title)} 
    className="items-center justify-center border-white border-2 h-28 w-28" >
    <Image source={{uri: image}} style={{width:100, height:100}}/>
  </TouchableOpacity>
);



const ProfileScreen = () => {
  const {user, logout} = useAuth();
  console.log(user)
  const navigation = useNavigation()
  const renderItem = ({ item }) => (
    <Item 
      title={item.clothingName} 
      image={item.photoURL}/>
  );

  return (
    
    <SafeAreaView className="">
      <View className="flex-row pb-3 justify-between mx-4 space-x-2">
        {/* Header with title and search bar */}
        <Text className="font-bold text-3xl">
        {(user.displayName != undefined)? user.displayName : user.email}
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

      <View className="flex-row bottom-0 left-6">
        {/* profile pic */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="items-center justify-center rounded-full w-15 h-15 border-black border-2">
            <View className="items-center justify-center">
              <Icon name="person" color="black" size="60"/>
            </View>
        </TouchableOpacity>

        {/* following */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="items-center justify-center left-12">
            <Text className="font-medium">
              10
            </Text>
            <Text className="font-light text-xs">
              following
            </Text>
        </TouchableOpacity>

        {/* followers */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="items-center justify-center left-16">
            <Text className="font-medium">
              10
            </Text>
            <Text className="font-light text-xs">
              Followers
            </Text>
        </TouchableOpacity>

        {/* likes */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="items-center justify-center left-20 ">
            <Text className="font-medium">
              10
            </Text>
            <Text className="font-light text-xs">
              Likes
            </Text>
        </TouchableOpacity>

        {/* separator */}
        <Text className="font-thin text-2xl justify-center left-10 top-3">
          |
        </Text>
        <Text className="font-thin text-2xl justify-center right-8 top-3">
          |
        </Text>
        
      </View>

      {/* full name */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 top-2">
        <Text className="font-bold text-xl">
          full name
        </Text>
      </View>

      {/* bio */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 bottom-1">
        <Text className="font-light text-sm">
          Hi! This is where i post all my clothes...
        </Text>
      </View>

      <View className="flex flex-row bottom-0 left-6 h-7">
        {/* edit profile button */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="basis-9/12 items-center justify-center rounded-md border-black bg-stone-300">
            <View className="items-center justify-center">
              <Text>
                edit profile
              </Text>
            </View>
        </TouchableOpacity>

        {/* share button */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className="basis-1/12 items-center justify-center left-3 rounded-md bg-stone-300">
            <View className="items-center justify-center">
            <Icon name="reply" color="black" size="20"/>
            </View>
        </TouchableOpacity>
      </View>
      
      <View className="flex flex-row justify-evenly top-5 h-7">
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
          className=" items-center justify-center ">
            <View className="items-center justify-center">
            <Icon name="heart" type="feather" size="25"/>
            </View>
        </TouchableOpacity>
      </View>

      {/* all clothes */}
      <View className="top-6 items-center mx-6 h-[450px]">
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}

      />
      </View>

    </SafeAreaView>
  )
}

export default ProfileScreen
