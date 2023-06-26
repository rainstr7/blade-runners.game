import React, { useState, useEffect, createContext, ReactElement } from 'react'

interface Theme {
  backgroundColor: string;
  color: string;
  buttonBackground: string;
  buttonColor: string;
}

interface Props {
  children: ReactElement
}

export const ThemeContext = createContext<Theme | null>(null)

export const ThemeProvider = ({children}: Props ) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  
  useEffect(() => {
    const fetchTheme = async () => {
      const response = await fetch('/api/theme')
      const data = await response.json()
      setTheme(data)
    }
    fetchTheme()
  }, [])
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
