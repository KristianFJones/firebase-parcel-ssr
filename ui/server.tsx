import { Readable } from 'stream'
import { ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import React from 'react'
import { NormalizedCacheObject } from 'apollo-boost'
import { ApolloProvider, getMarkupFromTree } from 'react-apollo-hooks'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { createStyleStream, getProjectStyles } from 'used-styles'
import App from './App'
import MultiStream from 'multistream'
import { Config, ConfigProvider } from './components/ConfigProvider'
import { HeadProvider, resetTagID } from './components/HeadProvider'
import { ImportedStream, printDrainHydrateMarks } from 'react-imported-component'
import { initApollo } from './lib/initApollo'

const readable = () => {
  const s = new Readable()
  s._read = () => true
  return s
}

const readableString = (string: string) => {
  const s = new Readable()
  s.push(string)
  s.push(null)
  s._read = () => true
  return s
}

export interface AppState {
  APOLLO_STATE: NormalizedCacheObject
  CONFIG: Config
}

const stylesLookup = getProjectStyles(__dirname)

export async function uiServer(req: Request, res: Response, config: Config) {
  const clientAssetsFile = '../public/client.json'
  const { client: clientScript } = await import(clientAssetsFile)

  const preloads = `<link rel="preload" href="${clientScript}" type="application/javascript" as="script"><link rel="icon" type="image/png" href="icons-192.png">`
  res.write(`<!DOCTYPE html><html><head>${preloads}`)

  const client = initApollo({ baseUrl: config.baseUrl })

  resetTagID()

  let head: JSX.Element[] = []


  
  let streamUID = 0

  const app = (
    <ServerLocation url={req.url}>
      <ConfigProvider {...config}>
        <HeadProvider tags={head}>
          <ImportedStream takeUID={(uid) => (streamUID = uid)}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </ImportedStream>
        </HeadProvider>
      </ConfigProvider>
    </ServerLocation>
  )

  const htmlStream = renderToNodeStream(app)

  await getMarkupFromTree({
    renderFunction: renderToString,
    tree: app
  })

  const headerStream = readable()

  const lookup = await stylesLookup
  const styledStream = createStyleStream(
    lookup,
    (style) => `<link href="dist/${style}" rel="stylesheet">\n`,
  )

  let state: AppState = { CONFIG: config, APOLLO_STATE: client.cache.extract() }

  const endStream = readableString(
    `</div>
      <script id="APP_STATE" type="application/json">${JSON.stringify(state)}</script>
      <script type="application/javascript" async src="${clientScript}"></script>
    </body>
  </html>`,
  )

  const middleStream = readableString('</head><body><div id="app">')

  const streams = [headerStream, middleStream, styledStream, endStream]

  MultiStream(streams).pipe(res)

  htmlStream.pipe(
    styledStream,
    { end: false },
  )

  htmlStream.on('end', () => {
    headerStream.push(printDrainHydrateMarks(streamUID));
    headerStream.push(renderToString(<>{head}</>))
    headerStream.push(null)
    styledStream.end()
  })
}
