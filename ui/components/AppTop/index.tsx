import React, { createContext, useState } from 'react'
import { AppBar } from '../AppBar'
import { NavBar } from '../NavBar'

interface NavProps {
  open: boolean
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Nav = createContext<NavProps>({
  open: false,
  toggleOpen: () => {},
})

export const AppHeader = () => {
  const useNav = (iV: boolean) => {
    const [count, setCount] = useState<boolean>(iV)
    return { open: count, toggleOpen: setCount }
  }

  const nav = useNav(false)

  return (
    <Nav.Provider value={nav}>
      <AppBar menuClick={() => console.log('Test')} />
      <NavBar />
    </Nav.Provider>
  )
}
