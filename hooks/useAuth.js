/*
Authentication provider file
holds the profiles that can be logged in, lets stack navigator know what pages are accessable

TODO: find alternative to deprecated google sign in
*/
import React , {createContext, useContext, useEffect, useState, useMemo} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { auth, firebase, db } from "../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { Platform } from 'react-native';
import { getDoc ,doc, setDoc, addDoc, onSnapshot } from 'firebase/firestore';
export const isAndroid = () => Platform.OS === 'android';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const config = {    //sign in configurations
  clientId: "281048744585-u927f736b5ho76eri7tt96peg9ok03et.apps.googleusercontent.com",
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error,setError] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //if user is logged in
          setUser(user);
          //console.log(user);
        }
        else{
          //not logged in
          setUser(null);
        }
        //debug user
      
        //console.log("user is: "+ user.uid);
        setLoadingInitial(false);
      }),
    []
  );







  const logout = () => {
    setLoading(true);
   
    signOut(auth)
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  /*
  async function registerUser(email,password) {
    setEmail(email);
    setPassword(password);
    setLoading(true);

    try{
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // const user  = result.user;
      // await setDoc(doc(db, "users",user.uid),{
      //   uid: user.uid,
      //   email: email
      // })
    } catch(error){
      setError(error);
    } finally{
      setLoading(false);
    }
  } 
*/
  async function registerUser(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url:'https://thriftr-1e99d.firebaseapp.com',
        })
        .then(() => {
            alert('verification email sent')
        })
        .catch((error) => {
            alert.apply(error.message)
        })
        .then(() => {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                email: email,
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    })
    .catch((error) => {
        alert(error.message)
    })
}


  const signInWithGoogle = async()=> promptAsync();
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  
  
  // memoization optimisation
  // caches value so no need for recalculation
  // only runs again when variables update
  // https://www.w3schools.com/react/react_usememo.asp
  // const memoedValue = useMemo(
  //   ()=>({
  //     user,
  //     loading,
  //     error,
  //     signInWithGoogle,      //added google sign in option
  //     registerUser,
  //     logout,
  //   }),
  //   [user, loading, error]
  // );

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
    
      signInWithGoogle,      //added google sign in option
      registerUser,
      logout,
    }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )

  
}

//allow other pages to import this function so that can use the information of users 
//eg. "const { user } = useAuth();" gets value of user
export default function useAuth() { 
  return useContext(AuthContext);
}