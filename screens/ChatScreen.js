import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
//import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

const ChatScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      {/* Header with title and search bar */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Text className="font-bold text-3xl">
          Chats
        </Text>
      </View>
      

      <TouchableOpacity 
          onPress={()=> console.log("press profile")}
          className=" items-center justify-center border-black bg-stone-500 h-28 w-28">
            <View className="items-center justify-center">
            
            </View>
      </TouchableOpacity>


    </SafeAreaView>
  )
}

export default ChatScreen