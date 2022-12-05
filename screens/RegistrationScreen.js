/*
Register by email
also offers continue with google
*/

import { View, Text, TextInput, StyleSheet , Button} from "react-native";
import React, {useState, useEffect} from "react";
import { auth, firebase } from '../firebase'
import '@firebase/firestore';
import useAuth from "../hooks/useAuth";
import { doc, FieldValue } from "firebase/firestore";


const Registration = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {registerUser, loading} = useAuth();
    
    async function registration() {
        if (email === '' || password === '') {
            setError('Email and password are required');
            return;
        }
        try {
            registerUser(email, password);
            // .then(()=>{
            //     dbRoot.doc(user, user.uid)
            //     .set({
            //         email:email,
            //         display: displayName,
            //     })
            // })
        } catch (error) {
            setError(error.message);
        }
    }
    // registerUser = async (email, password, firstName, lastName) => {
    //     await firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then(() => {
    //         firebase.auth().currentUser.sendEmailVerification({
    //             handleCodeInApp: true,
    //             url:'https://thriftr-1e99d.firebaseapp.com',
    //         })
    //         .then(() => {
    //             alert('verification email sent')
    //         }).catch((error) => {
    //             alert.apply(error.message)
    //         })
    //         .then(() => {
    //             firebase.firestore().collection('users')
    //             .doc(firebase.auth().currentUser.uid)
    //             .set({
    //                 firstName,
    //                 lastName,
    //                 email,
    //             })
    //         })
    //         .catch((error) => {
    //             alert(error.message)
    //         })
    //     })
    //     .catch((error) => {
    //         alert(error.message)
    //     })
    //     console.log(firebase.auth().currentUser);
    // }

    return (
        <View style={styles.container}>
            <Text>
                Create Account
            </Text>
            {!!error && <View style={styles.error}><Text>{error}</Text></View>}
            <View style={styles.controls}>
                <TextInput placeholder="Email" containerStyle={styles.control} value={email} onChangeText={(email) => setEmail(email)} autoCapitalize="none" autoCorrect={false} keyboardType="email-address"/>
                <TextInput placeholder="password" containerStyle={styles.control} value={password} onChangeText={(password) => setPassword(password)} autoCapitalize="none" autoCorrect={false} secureTextEntry={true}/>
                <Button title="Create account" buttonStyle={styles.control} onPress={registration}>
                </Button>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        fontSize: 100,
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      controls: {
        flex: 1,
        padding: 10,
      },
    
      control: {
        marginTop: 100,
      },
    
      error: {
        margin: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
        borderRadius: 10,
      }
});
export default Registration