import React from 'react'
import { RouteComponentProps } from '@reach/router'
import importedComponent from 'react-imported-component'

const ExampleRoute = importedComponent<typeof import('ui/routes/Loading/test').default>(() =>
  import('ui/routes/Loading/test'),
)

export default function LoadingPage(props: RouteComponentProps) {
  return (
    <div>
      <ExampleRoute />
      Testing
    </div>
  )
}
