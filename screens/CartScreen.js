import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CartList from './CartList'

const CartScreen = () => {
  return (
    <SafeAreaView className="">
      {/* Header with title and search bar */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Text className="font-bold text-3xl">
          Cart
        </Text>
        {/* TODO: Search bar to be IMPLEMENTED */}

      </View>
      <CartList/>
      {/* Chats list*/}


    </SafeAreaView>
  )
}

export default CartScreen