import { View, Text, SafeAreaView, Button, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth';
import { Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";




const ProfileScreen = () => {
  const {user, logout} = useAuth();
  console.log(user)
  const navigation = useNavigation()

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
      <ScrollView className=" px-5 top-6 gap-1 h-3/6">
      <View className="gap-1 flex-row grid-cols-3">
        {/* clothes card */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className=" items-center justify-center border-black bg-stone-300 h-28 w-28">
            <View className="items-center justify-center">
            
            </View>
        </TouchableOpacity>
        {/* clothes card */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className=" items-center justify-center border-black bg-stone-300 h-28 w-28">
            <View className="items-center justify-center">
            
            </View>
        </TouchableOpacity>
        {/* clothes card */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className=" items-center justify-center border-black bg-stone-300 h-28 w-28">
            <View className="items-center justify-center">
            
            </View>
        </TouchableOpacity>
        {/* clothes card */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className=" items-center justify-center border-black bg-stone-400 h-28 w-28">
            <View className="items-center justify-center">
            
            </View>
        </TouchableOpacity>
        {/* clothes card */}
        <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className=" items-center justify-center border-black bg-stone-500 h-28 w-28">
            <View className="items-center justify-center">
            
            </View>
        </TouchableOpacity>
  
      </View>
      </ScrollView>
   
    </SafeAreaView>
  )
}

export default ProfileScreen
