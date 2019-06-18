import { style } from 'typestyle'

export const divStyle = style({
  background: '#fafafa',
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '325px',
  borderRadius: '1em',
  padding: '1em',
  boxShadow:
    '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
})

export const titleStyle = style({
  fontSize: '2.125rem',
  fontWeight: 400,
  lineHeight: '2.5rem',
  marginBottom: '0.875rem',
  letterSpacing: '.0073529412em',
  fontFamily: 'Roboto,sans-serif',
  textDecoration: 'inherit',
  textTransform: 'inherit',
})

export const bodyStyle = style({
  fontFamily: 'Roboto,sans-serif',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  fontWeight: 400,
  letterSpacing: '.03125em',
  textDecoration: 'inherit',
  textTransform: 'inherit',
})

export const labelStyle = style({
  fontWeight: 'bold',
})
