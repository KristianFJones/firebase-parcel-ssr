import React, { useContext, useEffect, useState } from 'react'
import { List, ListItem, CollapsibleList, SimpleListItem, ListProps } from '@rmwc/list'
import { DrawerContent, Drawer } from '@rmwc/drawer'
import Icon from '@mdi/react'
import './styles.css'

import { routes, NavItem } from '~/components/Routes'
import { PropContext } from '../PropsProvider'
import { Link, globalHistory } from '@reach/router'
import { Theme } from '~App'
import { mdiChevronRight } from '@mdi/js'

const StartOpen = (items: NavItem[], usrpath: string, parentPath?: string): boolean =>
  items.some((item) =>
    'options' in item
      ? StartOpen(item.options, usrpath, item.path)
      : (parentPath ? `${parentPath}${item.path}` : item.path) === usrpath,
  )

interface HandleRouteProps {
  routes: NavItem[]

  parent?: string
  usrpath: string
}

const HandleRoutes = ({ routes, parent = '', usrpath }: HandleRouteProps) => {
  const { mode: themeMode } = useContext(Theme)

  return routes.map((m, index) =>
    'options' in m ? (
      <CollapsibleList
        key={m.label}
        handle={
          <SimpleListItem
            text={m.label}
            style={{ color: themeMode === 'Dark' ? 'white' : undefined }}
            metaIcon={<Icon path={mdiChevronRight} size={1} />}
          />
        }
        startOpen={StartOpen(m.options, usrpath, m.path)}
      >
        {HandleRoutes({ routes: m.options, parent: m.path, usrpath })}
      </CollapsibleList>
    ) : (
      <ListItem
        key={parent ? `${parent}${m.path}` : m.path}
        tag={Link}
        style={{ color: themeMode === 'Dark' ? 'white' : undefined }}
        {...({ to: parent ? `${parent}${m.path}` : m.path } as any)}
        onMouseOver={() => m.component.preload()}
        activated={(parent ? `${parent}${m.path}` : m.path) === usrpath}
      >
        {m.label}
      </ListItem>
    ),
  )
}

export const NavBar: React.FunctionComponent<
  { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> } & ListProps
> = ({ open, setOpen, ...props }) => {
  const [isMobileState, setIsMobileState] = useState(true)
  const { mode: themeMode } = useContext(Theme)
  const { req } = useContext(PropContext)
  const [usrPath, setUsrPath] = useState(
    typeof req !== 'undefined' ? req.path : window.location.pathname,
  )

  const doSizeCheck = (initial?: boolean) => {
    const isMobile = window.innerWidth < 640

    if (isMobileState !== isMobile) {
      setIsMobileState(isMobile)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => doSizeCheck())

    doSizeCheck(false)
  }, [])

  globalHistory.listen(({ location }) => {
    if (isMobileState && open === true) setOpen(false)
    setUsrPath(location.pathname)
  })

  return (
    <Drawer
      open={open}
      dismissible={!isMobileState}
      modal={isMobileState}
      style={{ backgroundColor: themeMode === 'Dark' ? '#050500' : undefined }}
      onClose={() => setOpen(false)}
    >
      <DrawerContent>
        <List {...props}>{HandleRoutes({ routes, usrpath: usrPath })}</List>
      </DrawerContent>
    </Drawer>
  )
}

NavBar.displayName = 'Navigation Bar'
