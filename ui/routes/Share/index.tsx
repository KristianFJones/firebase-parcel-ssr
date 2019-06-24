import React, { useMemo, useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import { titleStyle, bodyStyle } from '~/components/styles'
import { useConfig } from '~/components/ConfigProvider'
import { useProps, PropContext } from '~/components/PropsProvider'

import '@material/button/dist/mdc.button.min.css'
import '@material/dialog/dist/mdc.dialog.min.css'

const preRender = async () => ({ hello: 'Hello' })

const ShareTarget: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { baseUrl } = useConfig()
  useProps(preRender)
  const Share = useMemo(
    () =>
      props.location
        ? new URL(
            typeof window !== 'undefined'
              ? window.location.toString()
              : baseUrl + props.location.pathname,
          ).searchParams.get('description')
        : undefined,
    [props.location],
  )

  const {
    props: { hello },
  } = useContext(PropContext)

  return (
    <>
      <span className={titleStyle}>Share Target</span>
      <span className={titleStyle}>{hello}</span>
      <span className={bodyStyle}>
        {typeof Share === 'string' && Share.length > 0
          ? Share
          : 'Add this app to homescreen and share from another application'}
      </span>
    </>
  )
}

export default ShareTarget
