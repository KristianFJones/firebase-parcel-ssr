import React, { useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import { v4 } from 'public-ip'

import { useTitle } from '~/components/HeadProvider'
import { useProps, PropContext, getProp } from '~/components/PropsProvider'
import { titleStyle, bodyStyle, labelStyle } from '~/components/styles'

const getIP: getProp = async (req) => ({ IP: req ? req.headers['fastly-client-ip'] : await v4() })

const HomeRoute: React.FunctionComponent<RouteComponentProps> = (props) => {
  useProps(getIP)

  const {
    props: { IP },
  } = useContext(PropContext)

  useTitle('Example Page')

  return (
    <>
      <span className={titleStyle}>IP Address</span>
      <span className={bodyStyle}>
        <label className={labelStyle}>Public IP: </label>
        {IP}
      </span>
    </>
  )
}

HomeRoute.displayName = 'Home Route'

export default HomeRoute
