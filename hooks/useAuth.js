/*
Authentication provider file
holds the profiles that can be logged in, lets stack navigator know what pages are accessable
*/
import React , {createContext, useContext} from 'react';
//import * as Google from "expo-google-app-auth";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

  //connect to google login
  const signInWithGoogle = async() => {
    await signInWithGoogle.logInAsync()
  }
  
  return (
    <AuthContext.Provider 
    
      value={{
        user: null,
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