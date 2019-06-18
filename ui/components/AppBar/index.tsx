import React, { useState, useEffect } from 'react'
import { style } from 'typestyle'
import { NavBar } from 'ui/components/AppBar/NavBar'
/**
 *     background-color: #6200ee;
    background-color: var(--mdc-theme-primary,#6200ee);
    color: #fff;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
 */

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

/**
 *     display: flex;
    position: relative;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    min-height: 64px;
 */
const BarStyle = style({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '100%',
  height: 'auto',
  minHeight: '64px',
})

/**
 * font-family: Roboto,sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1.25rem;
    line-height: 2rem;
    font-weight: 500;
    letter-spacing: .0125em;
    text-decoration: inherit;
    text-transform: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 24px;
    margin-right: 0;
    align-self: center;
    padding: 12px 0;
    line-height: 1.5rem;
    z-index: 1;
 */

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

/**
 *     display: flex;
    position: relative;
    align-items: start;
    justify-content: center;
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    padding: 12px;
    border: none;
    outline: none;
    background-color: transparent;
    fill: currentColor;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
 */

const MenuIconStyle = style({
  height: '24px',
  width: '24px',
  padding: '12px',
})

export const AppBar: React.FunctionComponent = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  let [isMobileState, setIsMobileState] = useState(true)

  const doSizeCheck = (initial?: boolean) => {
    const isMobile = window.innerWidth < 640
    const menuIsOpen = initial && window.innerWidth > 640 ? true : menuOpen

    if (isMobileState !== isMobile || menuOpen !== menuIsOpen) {
      setMenuOpen(menuIsOpen)
      setIsMobileState(isMobile)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => doSizeCheck())
    doSizeCheck(false)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => doSizeCheck())
    doSizeCheck(false)
  }, [typeof window !== 'undefined' && window.innerWidth])

  return (
    <>
      <header className={HeaderStyle}>
        <div className={BarStyle}>
          <svg className={MenuIconStyle} viewBox='0 0 24 24' onClick={() => setMenuOpen(!menuOpen)}>
            <path fill='#000000' d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z' />
          </svg>
          <div className={TitleStyle}>IP Addr</div>
        </div>
      </header>
      <NavBar open={menuOpen} dismissible={!isMobileState} modal={isMobileState} />
    </>
  )
}

AppBar.displayName = 'AppBar'
