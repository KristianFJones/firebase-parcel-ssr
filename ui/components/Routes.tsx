import Loadable from 'react-loadable'
import { Loader } from './Loader'

const HomeRoute = Loadable({
  loader: () => import('~routes/Home'),
  modules: ['routes/Home'],
  loading: Loader,
  delay: 500,
})

interface NavItem {
  label: string
  to: string
  Component: typeof HomeRoute
}

const ShareTarget = Loadable({
  loader: () => import('~routes/Share'),
  modules: ['routes/Share'],
  loading: Loader,
  delay: 500,
})

const CountRoute = Loadable({
  loader: () => import('~routes/Count'),
  modules: ['routes/Count'],
  loading: Loader,
  delay: 500,
})

const TestingRoute = Loadable({
  loader: () => import('~routes/Testing'),
  modules: ['routes/Testing'],
  loading: Loader,
  delay: 500,
})

const DesignRoute = Loadable({
  loader: () => import('~routes/DesignTest'),
  modules: ['routes/DesignTest'],
  loading: Loader,
  delay: 500,
})

export const routes: NavItem[] = [
  { label: 'My IP', to: '/', Component: HomeRoute },
  { label: 'Design', to: '/design', Component: DesignRoute },
  { label: 'Testing', to: '/testing', Component: TestingRoute },
  { label: 'Share Target', to: '/share', Component: ShareTarget },
  { label: 'Counter', to: '/count', Component: CountRoute },
]
