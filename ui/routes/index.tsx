import React, { createContext, useState, useContext } from 'react'
import { Router } from '@reach/router'
import { routes } from '~/components/Routes'
import { lightdivStyle, darkdivStyle } from '~/components/styles'
import { Theme } from '~App'
import { cssRule, cssRaw } from 'typestyle'

export const Count = createContext<{
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}>({
  count: 0,
  setCount: () => {},
})

export const Routes: React.FunctionComponent = () => {
  const { mode: themeMode } = useContext(Theme)

  cssRaw(`
  body {
    --theme-secondary-background: #fafafa
  }
  `)

  cssRaw(`
  @media (prefers-color-scheme: dark) {
    body {

      --mdc-theme-background: #111111;
      --theme-secondary-background: #050500
    }
    
  }

`)
  cssRule('a', {
    color: themeMode === 'Dark' ? '#6200ee' : 'unset',
  })

  cssRule('span, label', {
    color: themeMode === 'Dark' ? 'white' : 'unset',
  })

  const useCounter = (iV: number) => {
    const [count, setCount] = useState<number>(iV)
    return { count: count, setCount: setCount }
  }

  const counter = useCounter(0)
  return (
    <Count.Provider value={counter}>
      <Router className={themeMode === 'Light' ? lightdivStyle : darkdivStyle}>
        {routes.map((R) =>
          'options' in R ? (
            R.options.map(({ component: Route, path }) => (
              <Route path={`${R.path}${path}`} key={path} />
            ))
          ) : (
            <R.component path={R.path} key={R.path} />
          ),
        )}
      </Router>
    </Count.Provider>
  )
}
