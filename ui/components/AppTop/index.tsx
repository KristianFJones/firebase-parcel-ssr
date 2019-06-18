import { navigate } from '@reach/router'
import React, { createContext, useState } from 'react'
import { ListOnActionEventT } from '@rmwc/list'
import { AppBar } from '../AppBar'
import { NavBar } from '../NavBar'
import { Menu } from '../Routes'

export const NavContext = createContext<{
  menuOpen: boolean
  setMenuOpen: (state: boolean) => void
}>({
  menuOpen: false,
  setMenuOpen: (state) => {},
})

export const AppHeader = () => {
  const [open, setOpen] = useState(false)

  const onAction = ({ detail }: ListOnActionEventT) => {
    setOpen(false)
    navigate(Menu[detail].to)
  }

  return (
    <NavContext.Provider
      value={{
        menuOpen: open,
        setMenuOpen: (state) => setOpen(!open),
      }}
    >
      <AppBar menuClick={() => console.log('Test')} />
      <NavBar onAction={onAction} />
    </NavContext.Provider>
  )
}
