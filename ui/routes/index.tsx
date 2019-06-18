import { Router } from '@reach/router'
import React from 'react'
import { HomeRoute } from './Home'
import { TestingRoute } from './Testing'

interface Route {
  path: string
  thing: any
}

export const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <HomeRoute path='/' />
      <TestingRoute path='/testing' />
    </Router>
  )
}
