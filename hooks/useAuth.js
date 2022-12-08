import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
//import * as Google from "expo-google-app-auth"
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { ResponseType } from 'expo-auth-session';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithCredential,signOut,onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';





const AuthContext = createContext({

})

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({children}) => {



  const[ accessToken, setAccessToken] = React.useState();
  const[ userinfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '200902666204-6edcotmoiprqtsqirki9cgs3a3thncfm.apps.googleusercontent.com'
  });


  const signInWithGoogle = async()=> promptAsync();
    React.useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      }
    }, [response]);

    async function getUserData() {
      let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}`}
      });

      userInfoResponse.json().then(data => {
        setUserInfo(data);
      });
    }



  return (
    <AuthContext.Provider value={{user: null, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth(){
  return useContext(AuthContext);
}


































