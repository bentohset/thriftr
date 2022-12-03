import { View, Text } from "react-native";
import React from "react";

const Header = (props) => {
    return (
        <View>
            <Text> Header </Text>
            <Text> {props.name} </Text>
        </View>
    )
}
export default Header