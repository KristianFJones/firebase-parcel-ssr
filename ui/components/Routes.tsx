import Loadable from 'react-loadable'
import { Loader } from './Loader'

const HomeRoute = Loadable({
  loader: () => import('~routes/Home'),
  modules: ['routes/Home/index.tsx'],
  loading: Loader,
  delay: 500,
})

export const TestingTab1 = Loadable({
  loader: () => import('~routes/Testing/Tab1'),
  modules: ['routes/Testing/Tab1/index.tsx'],
  loading: Loader,
  delay: 500,
})

export const TestingTab2 = Loadable({
  loader: () => import('~routes/Testing/Tab2'),
  modules: ['routes/Testing/Tab2/index.tsx'],
  loading: Loader,
  delay: 500,
})

export const TestingTab3 = Loadable({
  loader: () => import('~routes/Testing/Tab3'),
  modules: ['routes/Testing/Tab3/index.tsx'],
  loading: Loader,
  delay: 500,
})

const ShareTarget = Loadable({
  loader: () => import('~routes/Share'),
  modules: ['routes/Share/index.tsx'],
  loading: Loader,
  delay: 500,
})

const TestingRoute = Loadable({
  loader: () => import('~routes/Testing'),
  modules: ['routes/Testing/index.tsx'],
  loading: Loader,
  delay: 500,
})

const UIThemeDesignRoute = Loadable({
  loader: () => import('~routes/Design/UI'),
  modules: ['routes/Design/UI/index.tsx'],
  loading: Loader,
  delay: 500,
})

const SubnetInfo = Loadable({
  loader: () => import('~routes/Tools/SubnetInformation'),
  modules: ['routes/Tools/SubnetInformation/index.tsx'],
  loading: Loader,
  delay: 500,
})

const LoginRoute = Loadable({
  loader: () => import('~routes/Forms/Login'),
  modules: ['routes/Forms/Login/index.tsx'],
  loading: Loader,
  delay: 500,
})

const SlidingListDesignRoute = Loadable({
  loader: () => import('~routes/Design/SlidingList'),
  modules: ['routes/Design/SlidingList/index.tsx'],
  loading: Loader,
  delay: 500,
})

const L1_L2 = Loadable({
  loader: () => import('~routes/L1-1'),
  modules: ['routes/L1-1/index.tsx'],
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
  options: NavItem[]
}

export type NavItem = ChildNavItem | ParentNavItem

export const routes: NavItem[] = [
  { label: 'My IP', path: '/', component: HomeRoute },
  {
    label: 'Embeded Routes',
    path: '/routes',
    options: [
      {
        label: 'Level 1',
        path: '/L1',
        options: [
          {
            label: 'Level 1-2',
            path: 'L2',
            component: L1_L2,
          },
        ],
      },
    ],
  },
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
  { label: 'Testing', path: 'testing/*', component: TestingRoute },
  { label: 'Share Target', path: '/share', component: ShareTarget },
]
