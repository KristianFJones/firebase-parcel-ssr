import { Router } from '@reach/router'
import React from 'react'
import importComponent, { LazyBoundary, lazy } from 'react-imported-component'
import LoadingComponent from '../components/Loading';

const Example = importComponent(() => import('./Example'), { LoadingComponent })
const Index = importComponent(() => import('./Home'), { LoadingComponent, async: true })
const Query = importComponent(() => import('./Query'), { LoadingComponent })

export function Routes() {
  Example.preload()
  Index.preload()
  return (
    <LazyBoundary fallback={<div>Loading</div>}>
      <Router>
        <Index path='/' />
        <Example path='/example' />
        <Query path='/query' />
      </Router>
    </LazyBoundary>
  )
}
