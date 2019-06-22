import React, { useMemo } from 'react'
import { style } from 'typestyle'

interface ButtonProps {
  raised?: boolean
}

export const Button: React.FunctionComponent<ButtonProps> = ({ use, text }) => {
  const ButtonStyle = style({
    fontFamily: 'Roboto, sans-serif',
  })

  return useMemo(() => <span className={ButtonStyle}>{text}</span>, [])
}
