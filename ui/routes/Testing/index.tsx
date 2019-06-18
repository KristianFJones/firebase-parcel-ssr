import { RouteComponentProps, Link } from '@reach/router'
import React from 'react'
import { useTitle } from 'ui/components/HeadProvider'
import { divStyle, titleStyle, bodyStyle, labelStyle } from 'ui/components/styles'
import { useProps } from 'ui/components/PropsProvider'

export const TestingRoute: React.FunctionComponent<RouteComponentProps> = (props) => {
  useProps(async () => ({ hello: 'test' }))

  useTitle('Example Page')
  return (
    <div className={divStyle}>
      <span className={titleStyle}>Testing 123</span>
      <span className={bodyStyle}>
        <label className={labelStyle}>Testing: </label>
        <Link to='/'>
          {props.location && props.location.state && props.location.state.IP
            ? props.location.state.IP
            : 'NO IP Provided'}
        </Link>
      </span>
    </div>
  )
}
