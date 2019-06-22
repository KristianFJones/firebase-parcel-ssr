import React, { useMemo } from 'react'
import { RouteComponentProps } from '@reach/router'
import { titleStyle, bodyStyle } from '~/components/styles'
import { useConfig } from '~/components/ConfigProvider'
import { useProps } from '~/components/PropsProvider'

import '@material/button/dist/mdc.button.min.css'
import '@material/dialog/dist/mdc.dialog.min.css'

const preRender = async () => ({ hello: 'test' })

const ShareTarget: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { baseUrl } = useConfig()
  useProps(preRender)
  const Share = useMemo(
    () =>
      props.location &&
      new URL(
        typeof window !== 'undefined'
          ? window.location.toString()
          : baseUrl + props.location.pathname,
      ).searchParams.get('description'),
    [props.location],
  )

  return (
    <>
      <span className={titleStyle}>Share Target</span>
      <span className={bodyStyle}>{Share}</span>
    </>
  )
}

export default ShareTarget
