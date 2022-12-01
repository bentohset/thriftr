/*
Authentication provider file
holds the profiles that can be logged in, lets stack navigator know what pages are accessable

TODO: find alternative to deprecated google sign in
*/
import React , {createContext, useContext, useEffect, useState} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  getAuth,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const config = {    //sign in configurations
  androidClientId:'281048744585-b7120nj53i0uoka56de6nmj7n6luskpg.apps.googleusercontent.com', //android taken from google-services.json
  iosClientId: '281048744585-ribaqd26962n5qnmks8jga1fk198qqeu.apps.googleusercontent.com', //ios taken from google-services-info.plist
  expoClientId: '281048744585-bgk849tl2ob1db0ptvvtlslsa5faqm3n.apps.googleusercontent.com',
  webClientId: '281048744585-u927f736b5ho76eri7tt96peg9ok03et.apps.googleusercontent.com',
  scopes: ["profile","email"],
  permissions: ["public_profile","email","gender","location"],
  redirectUri: AuthSession.makeRedirectUri({ native: 'com.googleusercontent.apps.MYID://redirect',useProxy: true })
}

export const AuthProvider = ({children}) => {
  const [error,setError] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config);

  

  const signInWithGoogle = async() =>{
    await promptAsync().then(async (response) => {
      if (response.type === "success"){
        const {idToken, accessToken} = response;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        // const credential = GoogleAuthProvider.credential(
        //   null,
        //   response.authentication.accessToken
        // );
        await signInWithCredential(auth, credential);
      }
      return Promise.reject();
    }).catch(error => setError(error));
    // await Google.useAuthRequest(config). then(async(logInResult)=>{
    //   if (logInResult.type === "success"){
    //     const { idToken, accessToken } = logInResult;
    //     const credential = GoogleAuthProvider.credential(idToken, accessToken);

    //     await signInWithCredential(credential);
    //   }
    //   return Promise.reject();
    // })
  };
  useEffect(() => {
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
      console.log(user);
    })
  },[]);
  
  //Expo google login gets the credentials then firebase checks the crednetials and logs you in.
  // useEffect(() => {
  //   if (response?.type === 'success'){
  //     async function signIn(){
  //       const credential = GoogleAuthProvider.credential(null, response.authentication.accessToken);
  //       await signInWithCredential(auth,credential);
  //     }
  //     signIn();
  //   }
  // }, [response]);
  
  return (
    <AuthContext.Provider 
      value={{
        user:user,  
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