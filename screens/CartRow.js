import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import getOppositeUserInfo from '../lib/getOppositeUserInfo'
import flattenclothes from '../lib/flattenclothes'

const CartRow = ({cartDetails}) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [oppositeUserInfo, setOppositeUserInfo] = useState(null);
  const [clothesInfo, setClothesInfo] = useState(null);


  useEffect(() => {
   setOppositeUserInfo(getOppositeUserInfo(cartDetails.users, user.uid))
  }, [cartDetails, user]) //Retrives the database info of the opposite person, eg. seller sees buyer, buyer sees seller
  
  useEffect(() => {
    setClothesInfo(flattenclothes(cartDetails.clothingArticle))
   }, [cartDetails, user]) 


  console.log(clothesInfo); 

  return (
    <TouchableOpacity className="flex-row items-centre">
      <Image
      className= "h-16 w-16 mr-4 "
      source={{uri: clothesInfo?.photoURL}}
  /> 


    <Text>{clothesInfo.id}</Text>
    </TouchableOpacity>
  )
}

export default CartRow