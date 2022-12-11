import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth';

const ProfileScreen = () => {
  const {user, logout} = useAuth();

  return (
    <SafeAreaView className="">
      {/* Header with title and search bar */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Text className="font-bold text-3xl">
          {(user.displayName != undefined)? user.displayName : user.email}
        </Text>
        {/* TODO: Search bar to be IMPLEMENTED */}
      </View>

      
      <View className="flex justify-center items-center">
        <Text className="text-red-400">
          Hello, {user?.uid}!
        </Text>
        <Button title="Sign out" className="mt-10" onPress={logout}/>
      </View>


    </SafeAreaView>
  )
}

export default ProfileScreen