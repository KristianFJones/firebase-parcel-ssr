import '@material/theme/dist/mdc.theme.css'
import '@material/typography/dist/mdc.typography.css'
import React, { createContext, useState, useEffect } from 'react'
import { Routes } from '~/routes'
import { style, cssRule } from 'typestyle'
import { AppHeader } from '~/components/AppTop'
import { DrawerAppContent } from '@rmwc/drawer'

cssRule('html, body, #app', {
  margin: 0,
  padding: 0,
  height: '100%',
})

type ThemeTypes = 'Dark' | 'Light'

export const Theme = createContext<{
  mode: ThemeTypes
  setTheme: React.Dispatch<React.SetStateAction<ThemeTypes>>
}>({
  mode: 'Light',
  setTheme: () => {},
})

export const App: React.FunctionComponent = () => {
  const useTheme = (theme: ThemeTypes) => {
    const [themeMode, setTheme] = useState<ThemeTypes>(theme)
    useEffect(() => {
      const setAppTheme = () => {
        const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'
        setTheme(theme)
      }
      window.matchMedia('(prefers-color-scheme: dark)').onchange = () => setAppTheme()
      setAppTheme()
    }, [])

    return { mode: themeMode, setTheme }
  }

  const theme = useTheme('Light')

  const divStyle = style({
    justifyContent: 'center',
    backgroundColor: theme.mode === 'Dark' ? '#111111' : '#eee',
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    willChange: 'margin-left',
  })

  return (
    <Theme.Provider value={theme}>
      <AppHeader />
      <DrawerAppContent className={divStyle}>
        <Routes />
      </DrawerAppContent>
    </Theme.Provider>
  )
}

App.displayName = 'FirebaseReact'
