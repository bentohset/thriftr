import { View, Text ,Button, SafeAreaView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect , useState } from 'react'
import { firebase } from '../firebase';
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
    const navigation = useNavigation();
    const {logout} = useAuth();
    const [name, setName] = useState('')

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            }
            else {
                console.log('User does not exist')
            }
        })
    }, [])

    return (
        <SafeAreaView>
            <Text className="text-red-400">
                Hello, {name.firstName}
            </Text>
            <TouchableOpacity onPress={() => {firebase.auth().signOut()}}>
                <Text>
                    Sign out
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text>
                    settings
                </Text>
            </TouchableOpacity>
            <Button
                title="Go toooo Profile helloworld"
                onPress={()=>navigation.navigate("Profile")}
            />
            <Button title="Logout" onPress={logout}/>
        </SafeAreaView>
    )
}

export default HomeScreen