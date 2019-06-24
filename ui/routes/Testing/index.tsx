import { RouteComponentProps, Router, Link } from '@reach/router'
import React from 'react'
import { useTitle } from '~/components/HeadProvider'
import { titleStyle } from '~/components/styles'
import { TabBar, Tab } from '@rmwc/tabs'
import '@material/tab-bar/dist/mdc.tab-bar.css'
import '@material/tab/dist/mdc.tab.css'
import '@material/tab-scroller/dist/mdc.tab-scroller.css'
import '@material/tab-indicator/dist/mdc.tab-indicator.css'
import { TestingTab1, TestingTab2, TestingTab3 } from '~components/Routes'
import { Typography } from '@rmwc/typography'

interface TabProps {
  label: string
  path: string
  Component: typeof TestingTab1
}

const Tabs: TabProps[] = [
  { label: 'Tab 1', path: 'T1', Component: TestingTab1 },
  { label: 'Tab 2', path: 'T2', Component: TestingTab2 },
  { label: 'Tab 3', path: 'T3', Component: TestingTab3 },
]

const TestingHome: React.FunctionComponent<RouteComponentProps> = () => (
  <Typography use='headline4'>Home</Typography>
)

const TestingRoute: React.FunctionComponent<RouteComponentProps> = (props) => {
  useTitle('Example Page')

  return (
    <>
      <TabBar>
        <Tab tag={Link} {...({ to: './' } as any)} label='Home' />
        {Tabs.map((tab) => (
          <Tab tag={Link} {...({ to: tab.path } as any)} key={tab.label} label={tab.label} />
        ))}
      </TabBar>
      <Router>
        <TestingHome path='/' />
        {Tabs.map(({ Component, path }) => (
          <Component path={path} key={path} />
        ))}
      </Router>
    </>
  )
}

export default TestingRoute
