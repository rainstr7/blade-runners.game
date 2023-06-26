import React, { useState, useEffect, createContext, ReactElement } from 'react'
import cn from './style.module.scss'

const themeLight = {
  type: 'light',
  defaultColor: '#e5dfffeb',
  layoutBackground: 'https://nakerosine.ru/images/gallery/8-bit-images/001_8_bit_images.jpg'
}

const themeDark = {
  type: 'dark',
  defaultColor: '#fff',
  layoutBackground: 'https://avatars.mds.yandex.net/get-images-cbir/2512137/G84Ps9ZeitjXMksZyE7o6Q4778/ocr'
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
  const [theme, setTheme] = useState<Theme | null>(null);

  const toggleTheme = () => {
    setTheme(theme?.type === 'dark' ? themes.light : themes.dark)
  }
  
  useEffect(() => {
    setTheme(themes.dark)
  }, [])
  
  return (
    <ThemeContext.Provider value={theme}>
      <button className={`${cn.button} ${theme?.type === 'dark' ? cn.dark : cn.light}`} onClick={toggleTheme}></button>
      {children}
    </ThemeContext.Provider>
  )
}
