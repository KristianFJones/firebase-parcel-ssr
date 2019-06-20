import React, { useContext, useState, useEffect } from 'react'
import { Chip, ChipSet } from '@rmwc/chip'

import { Switch } from '@rmwc/switch'

import '@material/switch/dist/mdc.switch.css'
import '@material/form-field/dist/mdc.form-field.css'

import { titleStyle } from '~/components/styles'

import '@material/chips/dist/mdc.chips.css'
import { Theme } from '~App'

const DesignTestRoute = () => {
  const { setTheme, mode: themeMode } = useContext(Theme)
  const [checked, setChecked] = useState<boolean>(themeMode === 'Light')

  useEffect(() => {
    setTheme(checked ? 'Light' : 'Dark')
  }, [checked])

  return (
    <>
      <span className={titleStyle}>Design</span>
      <Switch
        label={themeMode}
        checked={checked}
        onChange={(evt) => setChecked(evt.currentTarget.checked)}
      />
      <ChipSet>
        <Chip selected label='Cookies' />
        <Chip label='Pizza' />
        <Chip label='Icecream' />
      </ChipSet>
    </>
  )
}

export default DesignTestRoute
