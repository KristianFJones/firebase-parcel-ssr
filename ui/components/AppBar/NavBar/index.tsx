import { navigate } from '@reach/router'
import React from 'react'
import { List, ListItem } from '@rmwc/list'
import { DrawerContent, Drawer, DrawerProps } from '@rmwc/drawer'

import '@material/drawer/dist/mdc.drawer.css'
import '@material/list/dist/mdc.list.css'

interface NavBarProps {
  open: boolean
}

interface NavItemProps {
  label: string
  to: string
}

const NavItem: React.FunctionComponent<NavItemProps> = ({ to, label }) => (
  <ListItem onClick={() => navigate(to, { state: { IP: '1.1.1.1' } })}>{label}</ListItem>
)

export const NavBar: React.FunctionComponent<DrawerProps> = (props) => {
  return (
    <Drawer dismissible {...props}>
      <DrawerContent>
        <List>
          <NavItem to='/' label='My IP' />
          <NavItem to='/testing' label='Testing' />
        </List>
      </DrawerContent>
    </Drawer>
  )
}
