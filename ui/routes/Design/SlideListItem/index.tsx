import '@material/button/dist/mdc.button.css'
import '@material/card/dist/mdc.card.css'
import '@material/icon-button/dist/mdc.icon-button.css'
import { mdiClose, mdiInformation } from '@mdi/js'
import { Icon } from '@mdi/react'
import { Card, CardActionIcons, CardActions, CardPrimaryAction } from '@rmwc/card'
import { ListItem, ListItemMeta, ListItemMetaProps } from '@rmwc/list'
import { Typography } from '@rmwc/typography'
import React, { useState } from 'react'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { ModuleInfo } from '../SlidingList'

interface SlideListItemProps extends ListItemMetaProps {
  name: string
  info: ModuleInfo
}

export const SlideListItem: React.FunctionComponent<SlideListItemProps> = ({
  name,
  info,
  ...props
}) => {
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
