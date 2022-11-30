/*
Authentication provider file
holds the profiles that can be logged in, lets stack navigator know what pages are accessable
*/
import React , {createContext, useContext} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  
  return (
    <AuthContext.Provider 
    
      value={{
        user: "hello",
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