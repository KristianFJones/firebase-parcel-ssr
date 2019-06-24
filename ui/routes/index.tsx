import React, { createContext, useState, useContext, ReactNode } from 'react'
import { Router } from '@reach/router'
import { routes, NavItem } from '~/components/Routes'
import { lightdivStyle, darkdivStyle } from '~/components/styles'
import { Theme } from '~App'
import { cssRule, cssRaw } from 'typestyle'
import { Netmask } from '@hg8496/netmask'

import '@material/theme/dist/mdc.theme.css'

export const IP = createContext<{
  IPAddr?: Netmask
  setIP: React.Dispatch<React.SetStateAction<Netmask | undefined>>
}>({
  setIP: () => {},
})

const HandleRoutes = (routes: NavItem[], parent?: string): ReactNode => {
  return routes.map((Route) =>
    'options' in Route ? (
      HandleRoutes(Route.options, Route.path)
    ) : (
      <Route.component
        path={parent ? `${parent}${Route.path}` : Route.path}
        key={parent ? `${parent}${Route.path}` : Route.path}
      />
    ),
  )
}

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

  cssRule('label.mdc-floating-label', {
    color: themeMode === 'Dark' ? 'white' : 'unset',
  })

  const useIP = () => {
    const [IPAddr, setIP] = useState<Netmask>()
    return { IPAddr, setIP }
  }

  const IPAddr = useIP()
  return (
    <IP.Provider value={IPAddr}>
      <Router className={themeMode === 'Light' ? lightdivStyle : darkdivStyle}>
        {HandleRoutes(routes)}
      </Router>
    </IP.Provider>
  )
}
