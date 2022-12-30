import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet  } from 'react-native'
import React, {useState} from 'react'
import { DotIndicator } from 'react-native-indicators'

const LoadingButton = ({ text, onPress, requirements }) => {
    const [loading, setLoading] = useState(false);
    const req = requirements ? true : false;        //if requirements are null, req is false (for forms - if inputs are not filled, disables button)

    async function pressFunc(){
        setLoading(true);
        onPress()           //NOTE: this function cannot be a console.log() coz it doesnt return a value/promise
        .then(setLoading(false));
    }
  return (
    <TouchableOpacity
        style={loading ? styles.buttonLoading : styles.button}
        className="w-11/12 p-4 rounded-2xl"
        disabled={loading || !req}      //disables button if requirements are not met or if its loading upon press
        onPress={()=>{
            pressFunc();
            console.log(req);
        }}
    >
        {loading ? (
            <DotIndicator size={5} count={3} color="white" />
        ) : (
            <Text className="text-white text-center font-semibold">{text}</Text>
        )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#5b5b5b',
      height: 50
    },
    buttonLoading: {
      backgroundColor: '#D9D9D9',
      height: 50
    },
  });

export default LoadingButton
