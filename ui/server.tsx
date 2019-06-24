import React from 'react'
import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'

import { Capture, preloadAll } from 'react-loadable'
import { renderToString } from 'react-dom/server'
import { getStyles } from 'typestyle'
import { App } from '~/App'
import { Config, ConfigProvider } from '~/components/ConfigProvider'
import { HeadProvider, resetTagID } from '~/components/HeadProvider'
import { Document } from '~/Document'
import {
  resetProps,
  PropProvider,
  Props,
  resetPageID,
  PathPropsObject,
} from '~/components/PropsProvider'
import { readJSON } from 'fs-extra'

export async function uiServer(req: Request, res: Response, config: Config) {
  await preloadAll()
  resetProps()

  const clientAssetsFile = 'public/client.json'
  const manifestFile = 'public/parcel-manifest.json'
  const [clientAssets, parcelManifest] = await Promise.all([
    readJSON(clientAssetsFile),
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
  ])
  const scripts = Object.values(clientAssets).filter(
    (script) => typeof script === 'string',
  ) as string[]

  let cssSRC: string[] = []

  resetTagID()
  resetPageID()

  let head: JSX.Element[] = []
  let modules: string[] = []

  let STF: any
  let sessionProps: PathPropsObject[] = []

  let html = ''
  try {
    try {
      renderToString(
        <ServerLocation url={req.url}>
          <ConfigProvider {...config}>
            <HeadProvider tags={head}>
              <Capture report={(moduleName) => modules.push(moduleName)}>
                <PropProvider
                  req={req}
                  props={await Props}
                  sessionProps={sessionProps}
                  path={req.path}
                >
                  <App />
                </PropProvider>
              </Capture>
            </HeadProvider>
          </ConfigProvider>
        </ServerLocation>,
      )
      sessionProps = [{ path: req.path, props: await Props }]
      STF = await Props
    } catch {
      sessionProps = [{ path: req.path, props: await Props }]
      STF = await Props
    }
    html = renderToString(
      <ServerLocation url={req.url}>
        <ConfigProvider {...config}>
          <HeadProvider tags={head}>
            <PropProvider req={req} props={STF} sessionProps={sessionProps} path={req.path}>
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

  let test: string[] = []

  modules.map((moduleName) =>
    Object.entries(parcelManifest)
      .filter(([a, b]) => {
        if (a === moduleName) {
          test.push(b)
        }

        return a === moduleName || test.some((a2) => a2.replace('.js', '.css') === b)
      })
      .map(([modulePath, file]) => {
        if (file.includes('.css')) cssSRC.unshift(file)
        else if (file.includes('.js')) scripts.push(file)
      }),
  )

  const document = renderToString(
    <Document
      html={html}
      state={{ CONFIG: config, PROPS: STF || {}, SESSIONPROPS: sessionProps }}
      scripts={scripts.reverse()}
      head={head}
      css={getStyles()}
      cssSRC={cssSRC}
    />,
  )

  res.status(200).send(`<!DOCTYPE html>${document}`)
}
