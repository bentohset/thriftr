import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>I am the HomeScreen</Text>
      <Button title = "Go to Profile Screen" onPress={() => navigation.navigate('Profile')}/>
    </View>
  )
}

export default HomeScreen