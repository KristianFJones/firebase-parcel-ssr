import React, { createContext, useState, useContext } from 'react'
import { Router } from '@reach/router'
import { routes } from '~/components/Routes'
import { lightdivStyle, darkdivStyle } from '~/components/styles'
import { Theme } from '~App'
import { cssRule } from 'typestyle'

export const Count = createContext<{
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}>({
  count: 0,
  setCount: () => {},
})

export const Routes: React.FunctionComponent = () => {
  const { mode: themeMode } = useContext(Theme)

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
        {routes.map(({ Component, to }) => (
          <Component path={to} key={to} />
        ))}
      </Router>
    </Count.Provider>
  )
}
