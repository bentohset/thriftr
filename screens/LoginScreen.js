/*
The log in screen
*/

import { View, Text , Button, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import useAuth from '../hooks/useAuth';


const LoginScreen = () => {
  const{ user, signInWithGoogle } = useAuth();      //use google as authentication
  const navigation = useNavigation();
//  console.log(user);


  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title='login with google' onPress={signInWithGoogle}/> 
      <Button title='Register with Email' onPress={() => navigation.navigate('Registration')}/>
    </View>
  )
}

export default LoginScreen;