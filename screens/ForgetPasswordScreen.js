import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {firebase} from '../firebase'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    
    const forgetPassword = () => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("password reset email sent")
      }).catch((error) => {
        alert(error)
      })
    }

      return (
        <View>
          <Text>Enter Valid Email</Text>
          <TextInput placeholder='email' onChangeText={(email) => setEmail(email)} autoCapitalize="none" autoCorrect={false}/>
          <TouchableOpacity onPress={() => {forgetPassword()}}>
            <Text> Send Password Reset </Text>
          </TouchableOpacity>
        </View>
       
      )
}


export default ForgetPassword