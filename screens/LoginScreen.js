/*
The log in screen
*/

import { View, Text , Button} from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const{ signInWithGoogle } = useAuth();      //use google as authentication
//  const { user } = useAuth();

//  console.log(user);


  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title='login with google' onPress={signInWithGoogle}/>   
    </View>
  )
  //ERROR when press login with google: possible unhandled promise rejection
}

export default LoginScreen;