import React, { createContext, useState } from 'react'
import { Router } from '@reach/router'
import { routes } from '~/components/Routes'

export const Count = createContext<{
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
}>({
  count: 0,
  setCount: () => {},
})

export const Routes: React.FunctionComponent = () => {
  const useCounter = (iV: number) => {
    const [count, setCount] = useState<number>(iV)
    return { count: count, setCount: setCount }
  }

  const counter = useCounter(0)
  return (
    <Count.Provider value={counter}>
      <Router>
        {routes.map(({ Component, to }) => (
          <Component path={to} key={to} />
        ))}
      </Router>
    </Count.Provider>
  )
}
