import { View, Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import React from 'react'

import HomeStack from './HomeStack';
import ChatStack from './ChatStack';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';
import AddClothesModal from './AddClothesModal';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const CustomTabBarButton = ({children, onPress})=>(
    <TouchableOpacity className="flex justify-center items-center bg-[#D9D9D9]">
      <Icon type="octicon" name="plus"/>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
      }}
    >
        <Tab.Screen name="Home" component={HomeStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
              <Icon type="material-community" name={focused ? "home" : "home-outline"} color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen name="Chat" component={ChatStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
              <Icon type="material-community" name={focused? "email":"email-outline"} color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen name="Add" component={CustomTabBarButton}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('AddClothesModal');
            }
          })}
          options={{
            tabBarIcon: ({focused, color, size})=>(
              <Icon type="octicon" name="plus" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen name="Cart" component={CartStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
              <Icon type="material-community" name={focused?"shopping":"shopping-outline"} color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileStack}
          options={{
            tabBarIcon: ({focused, color, size})=>(
              <Icon type="imaterial" name={focused?"person":"person-outline"} color={color} size="30"/>
            ),
          }}
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator