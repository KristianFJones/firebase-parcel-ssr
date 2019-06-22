import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { useTitle } from '~/components/HeadProvider'
import { titleStyle } from '~/components/styles'
import { Typography } from '@rmwc/typography'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { List, ListItem, ListItemMeta, ListItemMetaProps } from '@rmwc/list'
import '@material/list/dist/mdc.list.css'
import { Card, CardPrimaryAction, CardActions, CardActionIcons } from '@rmwc/card'
import '@material/card/dist/mdc.card.css'
import '@material/button/dist/mdc.button.css'
import '@material/icon-button/dist/mdc.icon-button.css'

import '@rmwc/data-table/data-table.css'

import { mdiInformation, mdiClose } from '@mdi/js'
import { Icon } from '@mdi/react'

interface ModuleInfo {
  description: string
  npm: string
  source: string
}

interface Module {
  name: string
  url: string
  info: ModuleInfo
}

const TestingRoute: React.FunctionComponent<RouteComponentProps> = (props) => {
  useTitle('Example Page')

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
      <span className={titleStyle}>Sliding List Demo</span>
      <List style={{ width: '100%' }}>
        {Modules.map(({ name, info }) => (
          <SlideListItem key={name} name={name} info={info} />
        ))}
      </List>
    </>
  )
}

export default TestingRoute

interface SlideListItemProps extends ListItemMetaProps {
  name: string
  info: ModuleInfo
}

const SlideListItem: React.FunctionComponent<SlideListItemProps> = ({ name, info, ...props }) => {
  const [selected, setSelected] = useState<boolean>(false)
  return (
    <>
      <ListItem
        activated={selected}
        ripple={{ accent: true }}
        onClick={() => (selected ? setSelected(false) : setSelected(true))}
      >
        {name}
        <ListItemMeta
          icon={
            <Icon path={selected ? mdiClose : mdiInformation} size={1} color='rgba(0,0,0,.38)' />
          }
          {...props}
        />
      </ListItem>
      <SlideDown className={'my-dropdown-slidedown'} closed={!selected} transitionOnAppear={false}>
        <Card outlined key={name} className='my-element'>
          <CardPrimaryAction>
            <div style={{ padding: '1rem' }}>
              <Typography use='body1' tag='p' theme='textSecondaryOnBackground'>
                {info.description}
              </Typography>
            </div>
          </CardPrimaryAction>
          <CardActions>
            <CardActionIcons />
          </CardActions>
        </Card>
      </SlideDown>
    </>
  )
}
