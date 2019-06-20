import React, { useContext, useMemo } from 'react'
import { List, ListItem } from '@rmwc/list'
import { DrawerContent, Drawer } from '@rmwc/drawer'
import './styles.css'

import { routes } from '~/components/Routes'
import { PropContext } from '../PropsProvider'
import { navigate } from '@reach/router'
import { Nav } from '../AppTop'
import { Theme } from '~App'

export const NavBar: React.FunctionComponent = () => {
  let { req } = useContext(PropContext)
  const { mode: themeMode } = useContext(Theme)
  let { open, toggleOpen } = useContext(Nav)

  const path = useMemo(() => (req ? req.path : window.location.pathname), [
    req ? req.path : window.location.pathname,
  ])

  return (
    <Drawer
      open={open}
      dismissible
      style={{ position: 'fixed', backgroundColor: themeMode === 'Dark' ? '#050500' : undefined }}
    >
      <DrawerContent>
        <List
          onAction={({ detail }) => {
            navigate(routes[detail].to)
            toggleOpen((state) => !state)
          }}
        >
          {routes.map(({ to, label, Component }, index) => (
            <ListItem
              activated={path === to}
              key={index}
              onMouseOver={() => Component.preload()}
              style={{ color: themeMode === 'Dark' ? 'white' : undefined }}
            >
              {label}
            </ListItem>
          ))}
        </List>
      </DrawerContent>
    </Drawer>
  )
}

NavBar.displayName = 'Navigation Bar'
