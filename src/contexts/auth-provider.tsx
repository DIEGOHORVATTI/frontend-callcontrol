import React, { createContext, useState, useEffect, useCallback } from 'react'

import { STORAGE_KEYS } from '@/constants/config'

import { decodeJwt } from '@/shared/decode-jwt'

import type { IUser } from '@/types/IUser'

export type IAuthContext = {
  user: IUser | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null)

  const login = useCallback((token: string) => {
    const decodedUser = decodeJwt<IUser>(token)

    if (decodedUser) {
      setUser(decodedUser)
      localStorage.setItem(STORAGE_KEYS.USER_TOKEN, token)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN)
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.USER_TOKEN)

    if (storedToken) {
      try {
        const decodedUser = decodeJwt<IUser>(storedToken)

        setUser(decodedUser)
      } catch (error) {
        logout()
      }
    }
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
