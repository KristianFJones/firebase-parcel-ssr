import { RouteComponentProps } from '@reach/router'
import { v4 } from 'public-ip'
import React, { useContext } from 'react'
import { useTitle } from 'ui/components/HeadProvider'
import { useProps, PropContext, getProp } from 'ui/components/PropsProvider'
import { divStyle, titleStyle, bodyStyle, labelStyle } from 'ui/components/styles'

const getIP: getProp = async (req) => ({ IP: req ? req.headers['fastly-client-ip'] : await v4() })

export const HomeRoute: React.FunctionComponent<RouteComponentProps> = (props) => {
  useProps(getIP)

  const {
    props: { IP },
  } = useContext(PropContext)

  useTitle('Example Page')

  return (
    <div className={divStyle}>
      <span className={titleStyle}>IP Address</span>
      <span className={bodyStyle}>
        <label className={labelStyle}>Public IP: </label>
        {IP}
      </span>
    </div>
  )
}

HomeRoute.displayName = 'Home Route'
