import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

import { STORAGE_KEYS } from '@/constants/config'

import type { User } from '@/types/User'

type AuthContextData = {
  user: User | null
  login: (username: string, maxCalls: number, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback((username: string, maxCalls: number, token: string) => {
    const newUser = { username, maxCalls, token }

    setUser(newUser)

    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)

    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA)

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
