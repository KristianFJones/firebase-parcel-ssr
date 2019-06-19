import React, { useContext, useMemo } from 'react'
import { style } from 'typestyle'
import { Nav } from '../AppTop'

const HeaderStyle = style({
  backgroundColor: '#6200ee',
  color: '#fff',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  width: '100%',
})

const BarStyle = style({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '100%',
  height: 'auto',
  minHeight: '64px',
})

const TitleStyle = style({
  fontFamily: 'Roboto,sans-serif',
  fontSize: '1.25rem',
  lineHeight: '2rem',
  fontWeight: 500,
  letterSpacing: '0.125em',
  textDecoration: 'inherit',
  textTransform: 'inherit',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginLeft: '24px',
  marginRight: 0,
  alignSelf: 'center',
  padding: '12px 0',
  zIndex: 1,
})

const MenuIconStyle = style({
  height: '24px',
  width: '24px',
  padding: '12px',
})

interface AppBarProps {
  menuClick: () => void
}

export const AppBar: React.FunctionComponent<AppBarProps> = ({ menuClick }) => {
  let { toggleOpen } = useContext(Nav)

  const Header = useMemo(
    () => (
      <header className={HeaderStyle}>
        <div className={BarStyle}>
          <svg
            className={MenuIconStyle}
            viewBox='0 0 24 24'
            onClick={() => toggleOpen((state) => !state)}
          >
            <path fill='#000000' d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
          </svg>
          <div className={TitleStyle}>IP Addr</div>
        </div>
      </header>
    ),
    [],
  )
  return Header
}

AppBar.displayName = 'AppBar'
