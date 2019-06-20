import '@material/theme/dist/mdc.theme.css'
import '@material/typography/dist/mdc.typography.css'
import React, { createContext, useState } from 'react'
import { Routes } from '~/routes'
import { style, cssRule } from 'typestyle'
import { AppHeader } from '~/components/AppTop'
import { ThemeProvider } from '@rmwc/theme'

cssRule('html, body', {
  margin: 0,
  padding: 0,
})

const divStyle = style({
  flex: '1 1 auto',
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  height: '94.396%',
  width: '100%',
  willChange: 'margin-left',
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
  const [themeState, setTheme] = useState<ThemeTypes>('Light')

  return (
    <Theme.Provider value={{ mode: themeState, setTheme }}>
      <ThemeProvider options={{ background: themeState === 'Light' ? '#eee' : '#111111' }}>
        <AppHeader />
        <div className={`${divStyle} mdc-theme--background`}>
          <Routes />
        </div>
      </ThemeProvider>
    </Theme.Provider>
  )
}

App.displayName = 'FirebaseReact'
