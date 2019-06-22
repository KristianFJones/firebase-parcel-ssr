import '@material/theme/dist/mdc.theme.css'
import '@material/typography/dist/mdc.typography.css'
import React, { createContext, useState, useEffect } from 'react'
import { Routes } from '~/routes'
import { style, cssRule } from 'typestyle'
import { AppHeader } from '~/components/AppTop'
import { ThemeProvider } from '@rmwc/theme'
import { DrawerAppContent } from '@rmwc/drawer'

cssRule('html, body, #app', {
  margin: 0,
  padding: 0,
  height: '100%',
})

const divStyle = style({
  flex: '1 1 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '93.185%',
  willChange: 'margin-left',
  position: 'fixed',
  width: '100%',
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

  return (
    <Theme.Provider value={theme}>
      <ThemeProvider
        options={{
          background: theme.mode === 'Light' ? '#eee' : '#111111',
          surface: theme.mode === 'Light' ? '#fff' : '#121212',
        }}
        style={{ height: '100%' }}
      >
        <AppHeader />
        <DrawerAppContent className={`${divStyle} mdc-theme--background`}>
          <Routes />
        </DrawerAppContent>
      </ThemeProvider>
    </Theme.Provider>
  )
}

App.displayName = 'FirebaseReact'
