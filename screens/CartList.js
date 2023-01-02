import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { FlatList } from 'react-native';
import CartRow from './CartRow';

const CartList = () => {
    const[cart, setCart] = useState([]);
    const {user} = useAuth();

    useEffect (() => {
      onSnapshot(
        query(
          collection(db, "cart"),
          where("buyerID", "array-contains", user.uid)
        ),
        (snapshot) => 
        setCart(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      )
    },[user]);
    
    


  return cart.length > 0? (
    <FlatList classname="h-full"
    data={cart}
    keyExtractor={(item) => item.id }
    renderItem = {({item})=> <CartRow cartDetails = {item} />}
    />
    ):(
      <View>
        <Text>You have nothing in cart, go and buy smth u noob</Text>
      </View>
  )
}

export default CartList