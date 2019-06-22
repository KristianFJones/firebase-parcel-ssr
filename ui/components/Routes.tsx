import Loadable from 'react-loadable'
import { Loader } from './Loader'

const HomeRoute = Loadable({
  loader: () => import('~routes/Home'),
  modules: ['routes/Home'],
  loading: Loader,
  delay: 500,
})

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

const UIThemeDesignRoute = Loadable({
  loader: () => import('~routes/Design/UI'),
  modules: ['routes/DesignTest'],
  loading: Loader,
  delay: 500,
})

const SubnetInfo = Loadable({
  loader: () => import('~routes/Tools/SubnetInformation'),
  modules: ['routes/Tools/SubnetInformation'],
  loading: Loader,
  delay: 500,
})

const LoginRoute = Loadable({
  loader: () => import('~routes/Forms/Login'),
  modules: ['routes/Forms/Login'],
  loading: Loader,
  delay: 500,
})

const SlidingListDesignRoute = Loadable({
  loader: () => import('~routes/Design/SlidingList'),
  modules: ['routes/Design/SlidingList'],
  loading: Loader,
  delay: 500,
})

export interface ChildNavItem {
  label: string
  path: string
  component: typeof HomeRoute
}

interface ParentNavItem {
  label: string
  path: string
  options: ChildNavItem[]
}

export type NavItem = ChildNavItem | ParentNavItem

export const routes: NavItem[] = [
  { label: 'My IP', path: '/', component: HomeRoute },
  {
    label: 'Design',
    path: '/design',
    options: [
      {
        label: 'UI Theme',
        path: '/UITheme',
        component: UIThemeDesignRoute,
      },
      {
        label: 'Sliding List',
        path: '/SlidingList',
        component: SlidingListDesignRoute,
      },
    ],
  },
  {
    label: 'Tools',
    path: '/Tools',
    options: [
      {
        label: 'Subnet Information',
        path: '/SubnetInfo',
        component: SubnetInfo,
      },
    ],
  },
  { label: 'Login Form', path: '/login', component: LoginRoute },
  { label: 'Testing', path: '/testing', component: TestingRoute },
  { label: 'Share Target', path: '/share', component: ShareTarget },
  { label: 'Counter', path: '/count', component: CountRoute },
]
