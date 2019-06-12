import { Readable } from 'stream'
import { ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import React from 'react'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { getProjectStyles, createStyleStream } from 'used-styles'
import MultiStream from 'multistream'
import { App } from './App'
import { Config, ConfigProvider } from './components/ConfigProvider'
import { HeadProvider, resetTagID } from './components/HeadProvider'
import { ImportedStream, printDrainHydrateMarks } from 'react-imported-component'

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

const stylesLookup = getProjectStyles(__dirname)

export async function uiServer(req: Request, res: Response, config: Config) {
  const clientAssetsFile = '../public/client.json'
  const clientAssets = import(clientAssetsFile)
  resetTagID()

  let head: JSX.Element[] = []

  let streamUID = 0

  const htmlStream = renderToNodeStream(
    <ServerLocation url={req.url}>
      <ConfigProvider {...config}>
        <HeadProvider tags={head}>
          <ImportedStream takeUID={(uid) => (streamUID = uid)}>
            <App />
          </ImportedStream>
        </HeadProvider>
      </ConfigProvider>
    </ServerLocation>,
  )

  const headerStream = readable()

  const lookup = await stylesLookup
  const styledStream = createStyleStream(
    lookup,
    (style) => `<link href="dist/${style}" rel="stylesheet">\n`,
  )

  res.write(
    `<!DOCTYPE html><html><head><link rel="icon" 
    type="image/png" 
    href="/icons-192.png"><link rel="manifest" href="/manifest.json"><meta name="viewport" content="width=device-width, initial-scale=1"><script type="application/javascript" async src="${
      (await clientAssets).client
    }" />`,
  )

  const middleStream = readableString('</head><body><div id="app">')
  const endStream = readableString(
    `</div><script type="application/javascript">window.APP_STATE = { CONFIG: ${JSON.stringify(
      config,
    )} };</script></body></html>`,
  )

  const streams = [headerStream, middleStream, styledStream, endStream]

  MultiStream(streams).pipe(res)

  htmlStream.pipe(
    styledStream,
    { end: false },
  )

  htmlStream.on('end', () => {
    headerStream.push(`\n${printDrainHydrateMarks(streamUID)}`)
    headerStream.push(renderToString(<>{head}</>))
    headerStream.push(null)
    styledStream.end()
  })
}
