import React, { useContext, useMemo } from 'react'
import { List, ListItem } from '@rmwc/list'
import { DrawerContent, Drawer } from '@rmwc/drawer'
import './styles.css'

import { routes } from '~/components/Routes'
import { PropContext } from '../PropsProvider'
import { navigate } from '@reach/router'
import { Nav } from '../AppTop'

export const NavBar: React.FunctionComponent = () => {
  let { req } = useContext(PropContext)
  let { open } = useContext(Nav)

  const path = useMemo(() => (req ? req.path : window.location.pathname), [
    req ? req.path : window.location.pathname,
  ])

  return (
    <Drawer open={open} dismissible style={{ position: 'fixed' }}>
      <DrawerContent>
        <List
          onAction={({ detail }) => {
            navigate(routes[detail].to)
          }}
        >
          {routes.map(({ to, label }, index) => (
            <ListItem activated={path === to} key={index}>
              {label}
            </ListItem>
          ))}
        </List>
      </DrawerContent>
    </Drawer>
  )
}

NavBar.displayName = 'Navigation Bar'
