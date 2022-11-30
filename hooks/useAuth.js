/*
Authentication provider file
holds the profiles that can be logged in, lets stack navigator know what pages are accessable
*/
import React , {createContext, useContext, useEffect, useState} from 'react';
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});

const config = {    //sign in configurations
  androidClientId:'281048744585-u927f736b5ho76eri7tt96peg9ok03et.apps.googleusercontent.com', //android taken from google-services.json
  iosClientId: '281048744585-ribaqd26962n5qnmks8jga1fk198qqeu.apps.googleusercontent.com', //ios taken from google-services-info.plist
  scopes: ["profile","email"],
  permissions: ["public_profile","email","gender","location"],
}
export const AuthProvider = ({children}) => {
  const [error,setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (user) {
        //if user is logged in
        setUser(user);
      }
      else{
        //not logged in
        setUser(null);
      }
    })
  },[]);

  //connect to google login
  const signInWithGoogle = async() => {
    
    await signInWithGoogle.logInAsync(config).then(async(logInResult)=>{
      if (logInResult.type == 'success'){
        //login ... (implement later)
        //links to firebase database to deconstruct credentials/info
        const { idToken, accessToken } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);

        await signInWithCredential(auth, credential);
      }
      return Promise.reject();
    })
    .catch(error => setError(error));
  }
  
  return (
    <AuthContext.Provider 
    S
      value={{
        user: user,  
        signInWithGoogle,      //added google sign in option
      }}
    >
       {children}
    </AuthContext.Provider>
  )

  
}

//allow other pages to import this function so that can use the information of users 
//eg. "const { user } = useAuth();" gets value of user
export default function useAuth() { 
  return useContext(AuthContext);
}