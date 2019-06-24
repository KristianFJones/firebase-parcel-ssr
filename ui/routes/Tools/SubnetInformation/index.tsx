import React, { ChangeEvent, useContext } from 'react'

import { useTitle } from '~/components/HeadProvider'
import { titleStyle } from '~/components/styles'
import { FirebaseRoute } from 'types/global'
import { useDebouncedCallback } from 'use-debounce'
import { Netmask } from '@hg8496/netmask'

import { TextField } from '@rmwc/textfield'

import '@material/textfield/dist/mdc.textfield.min.css'
import '@material/floating-label/dist/mdc.floating-label.min.css'
import '@material/notched-outline/dist/mdc.notched-outline.min.css'
import { LabelItem } from '~components/LabelItem'
import { masks } from './masks'

import { cssRaw } from 'typestyle'
import { Theme } from '~App'
import { IP } from '~routes'

const SubnetInformation: FirebaseRoute = (props) => {
  const { IPAddr, setIP } = useContext(IP)

  const { mode: themeMode } = useContext(Theme)

  const calculateNetwork = async (ipaddr: string) => setIP(new Netmask(ipaddr))

  const [debouncedCallback] = useDebouncedCallback((value) => calculateNetwork(value), 500)

  useTitle('Subnet Information')

  cssRaw(`
    ${
      themeMode === 'Dark'
        ? `
        .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading, .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch, .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
          border-color: white !important
        }
    
      .mdc-floating-label {
      color: white !important
    
    }`
        : ''
    }
  `)

  return (
    <>
      <span className={titleStyle}>Subnet Information</span>
      <TextField
        outlined
        label='IP Address'
        onChange={async (a: ChangeEvent<HTMLInputElement>) => debouncedCallback(a.target.value)}
      />
      {IPAddr && (
        <>
          <br />

          <LabelItem label='Network' value={IPAddr.toString()} />
          <LabelItem label='Subnet Mask' value={IPAddr.netmask} />
          <LabelItem label='Wildcard' value={IPAddr.hostmask} />
          <br />

          <LabelItem label='Address' value={IPAddr.network} />

          <LabelItem label='Broadcast' value={IPAddr.broadcastIP} />
          <br />

          <LabelItem label='Usable Hosts' value={masks[IPAddr.netmaskBits]} />
          <LabelItem label='Min' value={IPAddr.firstHostIP} />
          <LabelItem label='Max' value={IPAddr.lastHostIP} />
          <br />
        </>
      )}
    </>
  )
}

export default SubnetInformation
