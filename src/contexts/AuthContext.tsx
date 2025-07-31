
import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userRole: string | null
  login: (role: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Default to logged in for development
  const [userRole, setUserRole] = useState<string | null>('teacher') // Default to teacher

  const login = (role: string) => {
    setIsLoggedIn(true)
    setUserRole(role)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
