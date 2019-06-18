import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { getStyles } from 'typestyle'
import { App } from 'ui/App'
import { Config, ConfigProvider } from 'ui/components/ConfigProvider'
import { HeadProvider, resetTagID } from 'ui/components/HeadProvider'
import { Document } from 'ui/Document'
import { resetProps, PropProvider, Props, resetPageID } from './components/PropsProvider'

export default async function(req: Request, res: Response, config: Config) {
  resetProps()
  const clientAssetsFile = './client.json'
  const clientAssets = await import(clientAssetsFile)
  const scripts = Object.values(clientAssets).filter(
    (script) => typeof script === 'string',
  ) as string[]

  resetTagID()
  resetPageID()

  let head: JSX.Element[] = []

  let STF: any
  let PropIDs: number[] = []

  let html = ''
  try {
    try {
      renderToString(
        <ServerLocation url={req.url}>
          <ConfigProvider {...config}>
            <HeadProvider tags={head}>
              <PropProvider req={req} props={await Props} ids={PropIDs}>
                <App />
              </PropProvider>
            </HeadProvider>
          </ConfigProvider>
        </ServerLocation>,
      )
      STF = await Props
    } catch {
      STF = await Props
    }
    html = renderToString(
      <ServerLocation url={req.url}>
        <ConfigProvider {...config}>
          <HeadProvider tags={head}>
            <PropProvider req={req} props={STF} ids={PropIDs}>
              <App />
            </PropProvider>
          </HeadProvider>
        </ConfigProvider>
      </ServerLocation>,
    )
  } catch (error) {
    if (isRedirect(error)) {
      res.redirect(error.uri)
    } else {
      throw error
    }
  }

  const document = renderToString(
    <Document
      html={html}
      state={{ CONFIG: config, PROPS: STF, PROPIDs: PropIDs }}
      scripts={scripts}
      head={head}
      css={getStyles()}
    />,
  )

  res.status(200).send(`<!DOCTYPE html>${document}`)
}
