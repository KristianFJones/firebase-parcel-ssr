import React from 'react'
import { Routes } from 'ui/routes'
import { style, cssRule } from 'typestyle'
import { AppBar } from './components/AppBar'

cssRule('html, body', {
  margin: 0,
  padding: 0,
})

const divStyle = style({
  flex: '1 1 auto',
  maxWidth: '100%',
  backgroundColor: '#eee',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  height: '94.396%',
  width: '100%',
  willChange: 'margin-left',
})

export const App: React.FunctionComponent = () => {
  return (
    <>
      <AppBar />
      <div className={divStyle}>
        <Routes />
      </div>
    </>
  )
}

App.displayName = 'FirebaseReact'
