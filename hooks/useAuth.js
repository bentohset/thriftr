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
import { createUserWithEmailAndPassword } from "firebase/auth";
import Constants from 'expo-constants';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  getAuth,
  signOut,
} from "firebase/auth";

import { Platform } from 'react-native';
import { doc, setDoc, addDoc } from 'firebase/firestore';
export const isAndroid = () => Platform.OS === 'android';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const config = {    //sign in configurations
  clientId: isAndroid() ? '281048744585-b7120nj53i0uoka56de6nmj7n6luskpg.apps.googleusercontent.com' : '281048744585-ribaqd26962n5qnmks8jga1fk198qqeu.apps.googleusercontent.com',
  androidClientId:'281048744585-bgk849tl2ob1db0ptvvtlslsa5faqm3n.apps.googleusercontent.com', //android taken from google-services.json
  iosClientId: '281048744585-ribaqd26962n5qnmks8jga1fk198qqeu.apps.googleusercontent.com', //ios taken from google-services-info.plist
  expoClientId: '281048744585-bgk849tl2ob1db0ptvvtlslsa5faqm3n.apps.googleusercontent.com',
  webClientId: '281048744585-u927f736b5ho76eri7tt96peg9ok03et.apps.googleusercontent.com',
  scopes: ["profile","email"],
  permissions: ["public_profile","email","gender","location"],
  redirectUri: AuthSession.makeRedirectUri({ native: 'com.googleusercontent.apps.thriftr://redirect',useProxy: true })
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const [error,setError] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config,{useProxy: true});
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //if user is logged in
          setUser(user);
        }
        else{
          //not logged in
          setUser(null);
        }
        //debug user
      
        console.log("user is: "+ user);
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


  function registerUser(email,password,displayName) {
    setDisplayName(displayName);
    setEmail(email);
    setPassword(password);
    setLoading(true);
    
    createUserWithEmailAndPassword(auth, email, password)
    .then(()=> {
      addDoc(collection(db,"users", user.uid),{
        id: user.uid,
        display: displayName,
        email: email,

      })
    })
    .catch((error)=> setError(error))
    .finally(()=>setLoading(false));
  } 

  const signInWithGoogle = async() =>{
    setLoading(true);
    await promptAsync().then(async (response) => {
      if (response.type === "success"){
        const {idToken, accessToken} = response;
        console.log("idtoken and accestoken: "+idToken+" " + accessToken);
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        // const credential = GoogleAuthProvider.credential(
        //   null,
        //   response.authentication.accessToken
        // );
        await signInWithCredential(auth, credential);
      }
      return Promise.reject();
    }).catch(error => setError(error))
    .finally(()=> setLoading(false));

    // await Google.useAuthRequest(config). then(async(logInResult)=>{
    //   if (logInResult.type === "success"){
    //     const { idToken, accessToken } = logInResult;
    //     const credential = GoogleAuthProvider.credential(idToken, accessToken);

    //     await signInWithCredential(credential);
    //   }
    //   return Promise.reject();
    // })
  };
  
  // memoization optimisation
  // caches value so no need for recalculation
  // only runs again when variables update
  // https://www.w3schools.com/react/react_usememo.asp
  const memoedValue = useMemo(
    ()=>({
      user,
      loading,
      error,
      //signInWithGoogle,      //added google sign in option
      registerUser,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )

  
}

//allow other pages to import this function so that can use the information of users 
//eg. "const { user } = useAuth();" gets value of user
export default function useAuth() { 
  return useContext(AuthContext);
}