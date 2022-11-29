import { View, Text ,Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text className="text-red-400">HomeScreen</Text>
            <Button
                title="Go to Profileeee"
                onPress={()=>navigation.navigate("Profile")}
            />
        </View>
    )
}

export default HomeScreen