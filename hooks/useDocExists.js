import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { doc, updateDoc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const useDocExists = () => {
    const [exists,setExists] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() =>{
        if (user != null){
            const uID = user.uid;
            console.log(uID);
            onSnapshot(doc(db, "users",uID))
            .then(setExists(doc.exists))
            .catch(setError(error))
        }
    },[]);

  return exists;
}

export default useDocExists