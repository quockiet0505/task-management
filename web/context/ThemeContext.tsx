"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { ConfigProvider, theme } from "antd"

type ThemeContextType = {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(stored)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem("darkMode", String(newTheme))
  }

  if (!mounted) return <div style={{ visibility: "hidden" }}>{children}</div>

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider 
        theme={{ 
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm 
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)