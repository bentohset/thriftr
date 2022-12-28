import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

const LoadingButton = ({ text, onPress }) => {
    const [loading, setLoading] = useState(false);

    async function pressFunc(){
        setLoading(true);
        onPress()
        .then(setLoading(false));
    }
  return (
    <TouchableOpacity
        className="bg-[#5b5b5b] w-11/12 p-4 rounded-2xl"
        disabled={loading}
        onPress={()=>{
            pressFunc();
        }}
    >
        {loading ? (
            <ActivityIndicator size="small" />
        ) : (
            <Text className="text-white text-center font-semibold">{text}</Text>
        )}
    </TouchableOpacity>
  )
}

export default LoadingButton