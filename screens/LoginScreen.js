/*
The log in screen
*/

import { View, Text , Button, StyleSheet, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react'
import { auth, firebase } from "../firebase";
import useAuth from '../hooks/useAuth';
import { signInWithEmailAndPassword, getAuth} from 'firebase/auth';


const LoginScreen = () => {
  //const{ signInWithGoogle } = useAuth();      //use google as authentication
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');

  async function logIn(){
    if (email === '' || password === '') {
      setError('Email and password must be provided');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email,password);
    } catch (error) {
      setError(error.message);
    }
  }



  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      {!!error && <View style={styles.error}><Text>{error}</Text></View>}
      <View style={styles.controls}>
        <TextInput placeholder="Email" containerStyle={styles.control} value={email} onChangeText={(email) => setEmail(email)} autoCapitalize="none" autoCorrect={false} keyboardType="email-address"/>
        <TextInput placeholder="Password" containerStyle={styles.control} value={password} onChangeText={(password) => setPassword(password)} autoCapitalize="none" autoCorrect={false} secureTextEntry={true}/>
        <Button title="Sign in" buttonStyle={styles.control} onPress={logIn} />
        <Button title='Register with Email'  buttonStyle={styles.control} onPress={() => navigation.navigate('Registration')}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
    padding: 10,
  },

  error: {
    margin: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
    borderRadius: 10,
  }
});

export default LoginScreen;