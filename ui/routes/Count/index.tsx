import React, { useContext } from 'react'
import { RouteComponentProps } from '@reach/router'

import { useProps, getProp } from '~/components/PropsProvider'
import { divStyle, titleStyle, bodyStyle, labelStyle } from '~/components/styles'
import { Count } from '..'

const getIP: getProp = async (req) => ({ test: 'Hello' })

export const CountRoute: React.FunctionComponent<RouteComponentProps> = (props) => {
  const context = useContext(Count)
  useProps(getIP)

  return (
    <div className={divStyle}>
      <span className={titleStyle}>Counter</span>
      <span className={bodyStyle} onClick={() => context.setCount((state) => state + 1)}>
        <label className={labelStyle}>Count: </label>
        {context.count}
      </span>
    </div>
  )
}

CountRoute.displayName = 'Count Route'
