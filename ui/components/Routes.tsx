import React from 'react'
import Loadable from 'react-loadable'
import { TestingRoute } from '~/routes/Testing'
import { RouteComponentProps } from '@reach/router'
import { CountRoute } from '~/routes/Count'

interface NavItem {
  label: string
  to: string
  Component: React.FunctionComponent<RouteComponentProps> | Loadable.LoadableComponent
}

const ShareTarget = Loadable({
  loader: () => import('~routes/Share'),
  modules: ['routes/Share'],
  loading: () => <div>Loading</div>,
  delay: 500,
})

const HomeRoute = Loadable({
  loader: () => import('~routes/Home'),
  modules: ['routes/Home'],
  loading: () => <div>Loading</div>,
  delay: 500,
})

export const routes: NavItem[] = [
  { label: 'My IP', to: '/', Component: HomeRoute },
  { label: 'Testing', to: '/testing', Component: TestingRoute },
  { label: 'Share Target', to: '/share', Component: ShareTarget },
  { label: 'Counter', to: '/count', Component: CountRoute },
]
