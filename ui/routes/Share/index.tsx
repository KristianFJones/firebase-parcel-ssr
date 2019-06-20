import React, { useMemo, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { titleStyle, bodyStyle } from '~/components/styles'
import { useConfig } from '~/components/ConfigProvider'
import { useProps } from '~/components/PropsProvider'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogButton } from '@rmwc/dialog'

import { Button } from '@rmwc/button'

import '@material/button/dist/mdc.button.min.css'
import '@material/dialog/dist/mdc.dialog.min.css'

const preRender = async () => ({ hello: 'test' })

const ShareTarget: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { baseUrl } = useConfig()
  const [open, setOpen] = useState<boolean>(false)
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
    <>
      <Dialog
        open={open}
        onClose={(evt) => {
          console.log(evt.detail.action)
          setOpen(false)
        }}
      >
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>This is a standard dialog.</DialogContent>
        <DialogActions>
          <DialogButton action='close'>Cancel</DialogButton>
          <DialogButton action='accept' isDefaultAction>
            Sweet!
          </DialogButton>
        </DialogActions>
      </Dialog>
      <span className={titleStyle}>Share Target</span>
      <span className={bodyStyle}>{Share}</span>
      <Button raised label='Hello World' onClick={() => setOpen(!open)} />
    </>
  )
}

export default ShareTarget
