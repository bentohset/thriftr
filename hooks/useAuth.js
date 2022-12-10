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
import { doc, setDoc, addDoc, onSnapshot } from 'firebase/firestore';
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
  const [exists,setExists] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //if user is logged in
          setUser(user);
          console.log(user);
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

  useEffect(() =>{
    if (user != null){
      const uID = user.uid;
      const unsub = onSnapshot(doc(db, "users",uID),
          (doc) => setExists(doc.exists)
      );
      return ()=> unsub();
    }
  },[user]);

  const logout = () => {
    setLoading(true);
    
    signOut(auth)
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

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

  const signInWithGoogle = async()=> promptAsync();
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  // const signInWithGoogle = async() =>{
  //   setLoading(true);
  //   await promptAsync().then(async (response) => {
  //     if (response.type === "success"){
  //       const {idToken} = response.params;
  //       const credential = GoogleAuthProvider.credential(idToken);
  //       await signInWithCredential(auth, credential);
  //     }
  //     return Promise.reject();
  //   }).catch(error => setError(error))
  //   .finally(()=> setLoading(false));
  // };
  
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
      exists,
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