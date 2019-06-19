import React, { useContext } from 'react'
import { RouteComponentProps } from '@reach/router'

import { useProps, getProp } from '~/components/PropsProvider'
import { divStyle, titleStyle, bodyStyle, labelStyle } from '~/components/styles'
import { Count } from '..'

import '@material/button/dist/mdc.button.css'
import '@material/dialog/dist/mdc.dialog.css'

import { Button } from '@rmwc/button'

const getIP: getProp = async (req) => ({ test: 'Hello' })

const CountRoute: React.FunctionComponent<RouteComponentProps> = (props) => {
  const context = useContext(Count)
  useProps(getIP)

  return (
    <div className={divStyle}>
      <span className={titleStyle}>Counter Context</span>
      <span className={bodyStyle}>
        <label className={labelStyle}>Count: </label>
        {context.count}
      </span>
      <Button
        label='Increase'
        onClick={() => context.setCount((state) => state + 1)}
        raised
        style={{ marginBottom: '1em', marginTop: '1em' }}
      />
      <Button label='Decrease' onClick={() => context.setCount((state) => state - 1)} raised />
    </div>
  )
}

CountRoute.displayName = 'Count Route'

export default CountRoute
