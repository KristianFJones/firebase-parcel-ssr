import React, { useMemo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { divStyle, titleStyle, bodyStyle } from '~/components/styles'
import { useConfig } from '~/components/ConfigProvider'
import { useProps } from '~/components/PropsProvider'

import '@material/button/dist/mdc.button.css'

import { Button } from '@rmwc/button'

const preRender = async () => ({ hello: 'test' })

const ShareTarget: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { baseUrl } = useConfig()
  useProps(preRender)
  const Share = useMemo(() => {
    if (props.location)
      return new URL(
        typeof window !== 'undefined'
          ? window.location.toString()
          : baseUrl + props.location.pathname,
      ).searchParams.get('description')
  }, [props.location])

  return (
    <div className={divStyle}>
      <span className={titleStyle}>Share Target</span>
      <span className={bodyStyle}>{Share}</span>
      <Button raised label='Hello World' />
    </div>
  )
}

export default ShareTarget
