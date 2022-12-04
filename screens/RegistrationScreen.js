import { View, Text, TextInput, StyleSheet , Button} from "react-native";
import React, {useState} from "react";
import { auth, firebase } from '../firebase'
import '@firebase/firestore';
import useAuth from "../hooks/useAuth";
import { doc, FieldValue } from "firebase/firestore";


const Registration = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const {registerUser} = useAuth();
    
    async function registration() {
        if (email === '' || password === '') {
            setError('Email and password are required');
            return;
        }
        try {
            registerUser(email, password, displayName);
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
                Register Here!
            </Text>
            {!!error && <View style={styles.error}><Text>{error}</Text></View>}
            <View style={styles.controls}>
                <TextInput placeholder="Display Name" containerStyle={styles.control} value={displayName} onChangeText={(displayName) => setDisplayName(displayName)} autoCorrect={false} />
                <TextInput placeholder="Email" containerStyle={styles.control} value={email} onChangeText={(email) => setEmail(email)} autoCapitalize="none" autoCorrect={false} keyboardType="email-address"/>
                <TextInput placeholder="password" containerStyle={styles.control} value={password} onChangeText={(password) => setPassword(password)} autoCapitalize="none" autoCorrect={false} secureTextEntry={true}/>
                <Button title='Register' buttonStyle={styles.control} onPress={registration}/>
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