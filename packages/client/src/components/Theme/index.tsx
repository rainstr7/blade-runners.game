import React, { useState, useEffect, createContext, ReactElement } from 'react'
import cn from './style.module.scss'

import bgDark from '../../assets/default_bg.jpg'
import bgLight from '../../assets/light_bg.jpg'

const themeLight = {
  type: 'light',
  defaultColor: '#e5dfffeb',
  layoutBackground: bgLight
}

const themeDark = {
  type: 'dark',
  defaultColor: '#fff',
  layoutBackground: bgDark
}

const themes: Themes = {
  light: themeLight,
  dark: themeDark
}

interface Themes {
  light: Theme,
  dark: Theme
}

interface Theme {
  type: string,
  defaultColor: string,
  layoutBackground: string
}

interface Props {
  children: ReactElement
}

export const ThemeContext = createContext<Theme | null>(null)

export const ThemeProvider = ({children}: Props ) => {
  const [theme, setTheme] = useState<Theme>(themes.dark);

  const toggleTheme = () => {
    setTheme(theme.type === 'dark' ? themes.light : themes.dark)
  }
  
  return (
    <div className={cn.ThemeWrapper} style={{ "--default-color": theme.defaultColor } as React.CSSProperties}>
      <ThemeContext.Provider value={theme}>
        <button className={`${cn.button} ${theme.type === 'dark' ? cn.dark : cn.light}`} onClick={toggleTheme}></button>
        {children}
      </ThemeContext.Provider>
    </div>
  )
}
