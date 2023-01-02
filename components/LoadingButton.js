/*
    HOW TO USE Loading Button reusable component - Documentation:
    about:
        basically another touchable opacity but sets a loading state if button is pressed with some animation, loading will be false if API call is done/successfull

    note:
        height of button is fixed with css default styling at height:50 to maintain height of touchableopacity (changes when the content size is diff)

    props:
        - onPress: normal onPress prop for touchableopacity (and others) just put ur normal function (must return value/ promise)
        - text: accepts a string of text to display on touchableopacity
        - requirements: (specifically for forms for now) disables button if requirements are not met
            eg. requirements={name && size && age && ...} ie. inputs that useState(null)
        - clasStyle: basically className for customizing the sizing (DONT INCLUDE BG color)

    example:
        <LoadingButton
          onPress={()=>{
            submitForm();
          }}
          text="Add"
          requirements={clothingName && price && conditionValue && size}
        />
*/

import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet  } from 'react-native'
import React, {useState} from 'react'
import { DotIndicator } from 'react-native-indicators'

const LoadingButton = ({ text, onPress, requirements, classStyle }) => {
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
        className={classStyle}
        disabled={loading || !req}      //disables button
        onPress={()=>{
            pressFunc();
            console.log(req);
        }}
    >
        {loading ? (
            <DotIndicator size={5} count={3} color="white" />
        ) : (
            <Text className="text-white text-center font-bold">{text}</Text>
        )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#39C7A5',
      height: 50
    },
    buttonLoading: {
      backgroundColor: '#D9D9D9',
      height: 50
    },
  });

export default LoadingButton
