import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useTitle } from '~/components/HeadProvider'
import { Typography } from '@rmwc/typography'
import { List } from '@rmwc/list'
import '@material/list/dist/mdc.list.css'
import { SlideListItem } from '../SlideListItem'

export interface ModuleInfo {
  description: string
  npm: string
  source: string
}

export interface Module {
  name: string
  url: string
  info: ModuleInfo
}

const SlidingListDemo: React.FunctionComponent<RouteComponentProps> = (props) => {
  useTitle('Design - Sliding List')

  const Modules: Module[] = [
    {
      name: 'TS-Bind',
      url: 'https://gitlab.kristianjones.xyz/kfj-lab/TS-BIND',
      info: {
        description:
          'TS-Bind is a NPM module written in typescript for parsing and modifying a BIND Zonefile or named.conf configuraitonfile',
        npm: 'https://www.npmjs.com/package/ts-zone-file',
        source: 'https://gitlab.kristianjones.xyz/kfj-lab/TS-BIND',
      },
    },
    {
      name: 'TS-vCenter',
      url: 'https://github.com/KristianFJones/TS-vCenter',
      info: {
        description:
          'TS-vCenter is a NPM module written in typescript for using the vCenter REST API',
        npm: 'https://www.npmjs.com/package/ts-vcenter',
        source: 'https://github.com/KristianFJones/TS-vCenter',
      },
    },
  ]

  return (
    <>
      <Typography use='headline4'>Sliding List Demo</Typography>
      <List style={{ width: '100%' }}>
        {Modules.map(({ name, info }) => (
          <SlideListItem key={name} name={name} info={info} />
        ))}
      </List>
    </>
  )
}

export default SlidingListDemo
