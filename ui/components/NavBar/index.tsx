import React, { useContext, useState, useEffect } from 'react'
import { List, ListItem, ListOnActionEventT } from '@rmwc/list'
import { DrawerContent, Drawer } from '@rmwc/drawer'

import '@material/drawer/dist/mdc.drawer.css'
import '@material/list/dist/mdc.list.css'
import { Menu } from 'ui/components/Routes'
import { NavContext } from '../AppTop'
import { PropContext } from '../PropsProvider'

export const NavBar: React.FunctionComponent<{
  onAction: (evt: ListOnActionEventT) => void
}> = ({ onAction }) => {
  const { menuOpen, setMenuOpen } = useContext(NavContext)

  let [isMobileState, setIsMobileState] = useState(false)

  let { req } = useContext(PropContext)

  const doSizeCheck = (initial?: boolean) => {
    const isMobile = window.innerWidth < 640
    const menuIsOpen = initial && window.innerWidth > 640 ? true : menuOpen

    if (isMobileState !== isMobile || menuOpen !== menuIsOpen) {
      setMenuOpen(menuIsOpen)
      setIsMobileState(isMobile)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => doSizeCheck())
    doSizeCheck(false)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => doSizeCheck())
    doSizeCheck(false)
  }, [typeof window !== 'undefined' && window.innerWidth])

  return (
    <Drawer open={menuOpen} dismissible={!isMobileState} modal={isMobileState}>
      <DrawerContent>
        <List onAction={onAction}>
          {Menu.map(({ to, label }, index) => {
            return (
              <ListItem
                activated={
                  req
                    ? req.path.split('/').pop() === to.split('/').pop()
                    : window.location.pathname.split('/').pop() === to.split('/').pop()
                }
                key={index}
              >
                {label}
              </ListItem>
            )
          })}
        </List>
      </DrawerContent>
    </Drawer>
  )
}

NavBar.displayName = 'Navigation Bar'
