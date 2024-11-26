import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type User = {
  username: string
  maxCalls: number
  token: string
}

type AuthContextData = {
  user: User | null
  login: (username: string, maxCalls: number, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = useCallback((username: string, maxCalls: number, token: string) => {
    const newUser = { username, maxCalls, token }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
