import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, {useState} from "react";
import { firebase } from '../firebase'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    registerUser = async (email, password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://thriftr-1e99d.firebaseapp.com',
            })
            .then(() => {
                alert('verification email sent')
            }).catch((error) => {
                alert.apply(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return (
        <View>
            <Text>
                Register Here!
            </Text>
            <View>
                <TextInput placeholder="First Name" onChangeText={(firstName) => setFirstName(firstName)} autoCorrect={false} />
                <TextInput placeholder="Last Name" onChangeText={(lastName) => setLastName(lastName)} autoCorrect={false} />
                <TextInput placeholder="Email" onChangeText={(email) => setEmail(email)} autoCapitalize="none" autoCorrect={false} keyboardType="email-address"/>
                <TextInput placeholder="password" onChangeText={(password) => setPassword(password)} autoCapitalize="none" autoCorrect={false} secureTextEntry={true}/>
            </View>
            <TouchableOpacity onPress={() => registerUser(email, password, firstName, lastName)}>
                <Text> Register </Text>
            </TouchableOpacity>
        </View>
    )
}
export default Registration