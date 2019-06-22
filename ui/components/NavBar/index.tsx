import React, { useContext, useState, useMemo, useEffect } from 'react'
import { List, ListItem, CollapsibleList, SimpleListItem, ListItemProps } from '@rmwc/list'
import { DrawerContent, Drawer } from '@rmwc/drawer'
import Icon from '@mdi/react'
import './styles.css'

import { routes, ChildNavItem } from '~/components/Routes'
import { PropContext } from '../PropsProvider'
import { Link } from '@reach/router'
import { Theme } from '~App'
import { mdiChevronRight } from '@mdi/js'

const MainMenuItem: React.FunctionComponent<ChildNavItem & { parent?: string } & ListItemProps> = ({
  path,
  component,
  label,
  parent,
  ...props
}) => {
  let { req } = useContext(PropContext)
  const { mode: themeMode } = useContext(Theme)
  const usrpath = req ? req.path : window.location.pathname
  return (
    <ListItem
      tag={Link}
      style={{ color: themeMode === 'Dark' ? 'white' : undefined }}
      {...{ to: parent ? `${parent}${path}` : path } as any}
      onMouseOver={() => component.preload()}
      activated={(parent ? `${parent}${path}` : path) === usrpath}
      {...props}
    >
      {label}
    </ListItem>
  )
}

export const NavBar: React.FunctionComponent<{ open: boolean }> = ({ open }) => {
  const { mode: themeMode } = useContext(Theme)
  const [isMobileState, setIsMobileState] = useState(true)
  const { req } = useContext(PropContext)
  const usrpath = req ? req.path : window.location.pathname

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

  useEffect(() => {
    window.addEventListener('resize', () => doSizeCheck())
    doSizeCheck(false)
  }, [typeof window !== 'undefined' && window.innerWidth])

  return (
    <Drawer
      open={open}
      dismissible={!isMobileState}
      modal={isMobileState}
      style={{ position: 'fixed', backgroundColor: themeMode === 'Dark' ? '#050500' : undefined }}
    >
      <DrawerContent>
        <List>
          {routes.map((m, index) =>
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
                startOpen={m.options.some(({ path }) => `${m.path}${path}` === usrpath)}
              >
                {m.options.map((props, index) => (
                  <MainMenuItem key={index} parent={m.path} {...props} />
                ))}
              </CollapsibleList>
            ) : (
              <MainMenuItem key={index} {...m} />
            ),
          )}
        </List>
      </DrawerContent>
    </Drawer>
  )
}

NavBar.displayName = 'Navigation Bar'
