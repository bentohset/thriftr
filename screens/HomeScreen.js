import { View, Text ,Button, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect , useState } from 'react'
import { auth, firebase } from '../firebase';
import useAuth from "../hooks/useAuth";
import { signOut, getAuth } from 'firebase/auth';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {user, logout} = useAuth();
    
    // useEffect(() => {
    //     firebase.firestore().collection('users')
    //     .doc(firebase.auth().currentUser.uid).get()
    //     .then((snapshot) => {
    //         if(snapshot.exists){
    //             setName(snapshot.data())
    //         }
    //         else {
    //             console.log('User does not exist')
    //         }
    //     })
    // }, [])

    return (
        <View style={styles.container}>
            <Text className="text-red-400">
                Hello, {user?.uid}!
            </Text>
            <Button title="Sign out" style={styles.button} onPress={logout}/>
            <Button 
                title="Settings"
                style={styles.button}
                onPress={() => navigation.navigate('Settings')}/>
            <Button
                title="Profile"
                style={styles.button}
                onPress={()=>navigation.navigate("Profile")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginTop: 10
    }
  });

export default HomeScreen