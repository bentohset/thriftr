/*
Configure profile screen after registering with email or google

set full name and username then send to firebase firestore
*/
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const ConfigureProfileScreen = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  return (
    <View>
      <Text>ConfigureProfileScreen</Text>
      <TextInput 
        placeholder="Full Name" 
        value={fullName} 
        onChangeText={(fullName) => setFullyName(fullName)} 
        autoCorrect={false} 
        />
      <TextInput 
        placeholder="UserName" 
        value={userName} 
        onChangeText={(userName) => setDisplayName(userName)} 
        autoCorrect={false} 
      />
      <TouchableOpacity
        onPress={() => {navigation.navigate('HomeScreen')}}
      >
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfigureProfileScreen