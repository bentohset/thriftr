import { View, Text, SafeAreaView, Image, TouchableOpacity, Animated } from 'react-native'
import React, {useState} from 'react'
import LoadingButton from '../components/LoadingButton';
//import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

const ChatScreen = () => {
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
      }
    ).start();
  };

  const stopAnimation = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 500,
      }
    ).start();
  };

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

      <View className="flex items-center mt-5">
        <LoadingButton text="Test" onPress={()=> console.log("test button")}/>
      </View>


    </SafeAreaView>
  )
}

export default ChatScreen