import React from 'react'
import { style } from 'typestyle'

import { CircularProgress } from '@rmwc/circular-progress'

import '@rmwc/circular-progress/circular-progress.css'

const LoaderStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
})

export const Loader = () => (
  <div className={LoaderStyle}>
    <CircularProgress size={72} />
  </div>
)
