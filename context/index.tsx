import React, { useEffect, useState } from 'react';

export type AuthContextType = {
  token: string;
  saveToken: (newToken: string) => void,
  userId: string,
  saveUserId: (newUserId: string) => void
  userName: string,
  saveUserName: (newUserName: string) => void,
}

export const AuthContext = React.createContext<
  AuthContextType | undefined
>(undefined);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(undefined)
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [userName, setUserName] = useState<string | undefined>(undefined)

  useEffect(() => {
    console.log('asdfghjkl;');

    setToken(localStorage.getItem('token'))
  }, [])

  const saveToken = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('token', newToken);
  }

  const saveUserId = (newUserId: string) => {
    setUserId(newUserId)
    localStorage.setItem('userId', newUserId);
  }

  const saveUserName = (newUserName: string) => {
    setUserName(newUserName)
    localStorage.setItem('username', newUserName);
  }

  const value = {
    token,
    saveToken,
    userId,
    saveUserId,
    userName,
    saveUserName
  } as AuthContextType;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}