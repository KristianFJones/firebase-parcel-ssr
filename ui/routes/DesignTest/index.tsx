import React from 'react'
import { Chip, ChipSet } from '@rmwc/chip'

import { divStyle, titleStyle } from '~/components/styles'

import '@material/chips/dist/mdc.chips.css'

const DesignTestRoute = () => {
  return (
    <div className={divStyle}>
      <span className={titleStyle}>Counter Context</span>
      <ChipSet>
        <Chip selected label='Cookies' />
        <Chip label='Pizza' />
        <Chip label='Icecream' />
      </ChipSet>
    </div>
  )
}

export default DesignTestRoute
