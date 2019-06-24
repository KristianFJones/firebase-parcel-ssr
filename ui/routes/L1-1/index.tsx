import React, { useContext } from 'react'
import { Button } from '@rmwc/button'

import { Switch } from '@rmwc/switch'
import { style } from 'typestyle'

import '@material/typography/dist/mdc.typography.css'
import '@material/switch/dist/mdc.switch.min.css'
import '@material/form-field/dist/mdc.form-field.min.css'
import '@material/button/dist/mdc.button.css'
import { useTitle } from '~components/HeadProvider'
import { globalHistory } from '@reach/router'
import { PropContext } from '~components/PropsProvider'
import { Typography } from '@rmwc/typography'

const FieldStyle = style({
  marginTop: '1em',
})

const DesignTestRoute = () => {
  useTitle('Level 1 - 2')
  const { req } = useContext(PropContext)

  const usrpath = req ? req.path.split('/').pop() : globalHistory.location.pathname.split('/').pop()

  const LogLocation = () => {
    console.log(`Global History Location: `, globalHistory.location)
    console.log(`Window Location: `, window.location)
    console.log(`Usr Path: `, usrpath)
  }

  return (
    <>
      <Typography use='headline4'>Lab</Typography>
      <Switch className={FieldStyle} label='Hello World' />
      <Button className={FieldStyle} raised label='Test Location' onClick={LogLocation} />
    </>
  )
}

export default DesignTestRoute
