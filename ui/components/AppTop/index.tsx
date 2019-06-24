import React, { useState } from 'react'
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
} from '@rmwc/top-app-bar'
import '@material/top-app-bar/dist/mdc.top-app-bar.css'
import { NavBar } from '../NavBar'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'
import { navigate } from '@reach/router'

export const AppHeader = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon
              icon={<Icon path={mdiMenu} />}
              onClick={() => setOpen(!open)}
            />
            <TopAppBarTitle onClick={() => navigate('/')}>Firebase React</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <NavBar open={open} setOpen={setOpen} />
    </>
  )
}
