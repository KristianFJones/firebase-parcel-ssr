import React, { useMemo } from 'react'
import { style } from 'typestyle'

interface TypographyProps {
  use: 'headline1' | 'headline4'
  text: string
}

/**
 * .mdc-typography--headline1 {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 6rem;
  line-height: 6rem;
  font-weight: 300;
  letter-spacing: -0.015625em;
  text-decoration: inherit;
  text-transform: inherit;

  .mdc-typography--headline4 {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 2.125rem;
  line-height: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.0073529412em;
  text-decoration: inherit;
  text-transform: inherit;
}
}

 */

export const Typography: React.FunctionComponent<TypographyProps> = ({ use, text }) => {
  const fontSize = {
    headline1: '6rem',
    headline2: '',
    headline3: '',
    headline4: '2.125rem',
    headline5: '',
    headline6: '',
    subtitle1: '',
    subtitle2: '',
    body1: '',
    body2: '',
    caption: '',
    button: '',
    overline: '',
  }
  const lineHeight = {
    headline1: '6rem',
    headline2: '',
    headline3: '',
    headline4: '2.5rem',
    headline5: '',
    headline6: '',
    subtitle1: '',
    subtitle2: '',
    body1: '',
    body2: '',
    caption: '',
    button: '',
    overline: '',
  }

  const TypographyStyle = style({
    fontFamily: 'Roboto, sans-serif',
    fontSize: fontSize[use],
    lineHeight: lineHeight[use],
  })

  return useMemo(() => <span className={TypographyStyle}>{text}</span>, [])
}
