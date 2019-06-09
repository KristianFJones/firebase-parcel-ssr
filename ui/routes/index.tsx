import { Router } from '@reach/router'
import React from 'react'
import importedComponent from 'react-imported-component'

const Loader = importedComponent(() => import('ui/routes/Loading'))
const HomeRoute = importedComponent(() => import('ui/routes/Home'))
const QueryRoute = importedComponent<typeof import('ui/routes/Query').default>(async () =>
  import('ui/routes/Query'),
)
const ExampleRoute = importedComponent<typeof import('ui/routes/Example').default>(async () =>
  import('ui/routes/Example'),
)

export function Routes() {
  HomeRoute.preload()
  QueryRoute.preload()
  return (
    <Router>
      <HomeRoute path='/' />
      <ExampleRoute path='/example' />
      <QueryRoute path='Query' />
      <Loader path='/load' />
    </Router>
  )
}
