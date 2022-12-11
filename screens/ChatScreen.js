import { View, Text, SafeAreaView, } from 'react-native'
import React from 'react'

const ChatScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="absolute font-bold text-3xl left-10 top-40 leading-loose">
        Chats
      </Text>
    </SafeAreaView>
  )
}

export default ChatScreen