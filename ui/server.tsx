import { isRedirect, ServerLocation } from '@reach/router'
import { Request, Response } from 'express'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { ApolloProvider, getMarkupFromTree } from 'react-apollo-hooks'
import App from 'ui/App'
import { Config, ConfigProvider } from 'ui/components/ConfigProvider'
import { HeadProvider, resetTagID } from 'ui/components/HeadProvider'
import { Document } from 'ui/Document'
import { initApollo } from 'ui/lib/initApollo'
import { printDrainHydrateMarks } from 'react-imported-component'

export default async function(req: Request, res: Response, config: Config) {
  console.log('Test')
  const clientAssetsFile = './parcel-manifest.json'
  const clientAssets = await import(clientAssetsFile)
  const scripts = Object.values(clientAssets).filter(
    (script) => typeof script === 'string',
  ) as string[]

  const client = initApollo({ baseUrl: config.baseUrl })

  resetTagID()

  let head: JSX.Element[] = []

  let html = ''
  try {
    const AppElement = (
      <ServerLocation url={req.url}>
        <ConfigProvider {...config}>
          <HeadProvider tags={head}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </HeadProvider>
        </ConfigProvider>
      </ServerLocation>
    )
    let streamUID = 0
    html =
      (await getMarkupFromTree({
        renderFunction: renderToString,
        tree: AppElement,
      })) + printDrainHydrateMarks(streamUID)
  } catch (error) {
    if (isRedirect(error)) {
      res.redirect(error.uri)
    } else {
      throw error
    }
  }

  const state = client.cache.extract()

  const document = renderToString(
    <Document
      html={html}
      state={{ APOLLO_STATE: state, CONFIG: config }}
      scripts={scripts}
      head={head}
    />,
  )

  res.status(200).send(`<!DOCTYPE html>${document}`)
}
