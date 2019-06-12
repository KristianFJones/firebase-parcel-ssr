import { Router } from '@reach/router'
import React from 'react'
import { LazyBoundary, lazy } from 'react-imported-component'

const Example = lazy(() => import('./Example'))
const Index = lazy(() => import('./Home'))

export function Routes() {
  Example.preload()
  Index.preload()
  return (
    <LazyBoundary fallback={<div>Loading</div>}>
      <Router>
        <Index path='/' />
        <Example path='/example' />
      </Router>
    </LazyBoundary>
  )
}
