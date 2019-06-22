import React, { useContext } from 'react'
import { Chip, ChipSet } from '@rmwc/chip'

import { Switch } from '@rmwc/switch'

import '@material/switch/dist/mdc.switch.css'
import '@material/form-field/dist/mdc.form-field.css'

import { titleStyle } from '~/components/styles'

import '@material/chips/dist/mdc.chips.css'
import { Theme } from '~App'
import { useTitle } from '~components/HeadProvider'

const DesignTestRoute = () => {
  useTitle('Design Theme')
  const { setTheme, mode: themeMode } = useContext(Theme)

  return (
    <>
      <span className={titleStyle}>Design</span>
      <Switch
        label={themeMode}
        checked={themeMode === 'Light'}
        onChange={(evt) => setTheme(evt.currentTarget.checked ? 'Light' : 'Dark')}
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
