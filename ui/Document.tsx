import React from 'react'
import { Config } from 'ui/components/ConfigProvider'

export interface AppState {
  CONFIG: Config
  PROPS: any
  PROPIDs: number[]
}

interface DocumentProps {
  html: string
  scripts?: string[]
  css?: string
  state: AppState
  head: JSX.Element[]
}

export function Document({ html, css, scripts, state, head }: DocumentProps) {
  return (
    <html lang='en-US'>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {head}
        {scripts &&
          scripts.map(
            (src, index) => src && <link rel='preload' href={src} as='script' key={index} />,
          )}
        {scripts && (
          <link rel='stylesheet' type='text/css' href={scripts[0].replace('.js', '.css')} />
        )}

        {css ? <style id='styles'>{css}</style> : null}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: html }} />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_STATE = { CONFIG: ${JSON.stringify(
              state.CONFIG,
            )}, PROPS: ${JSON.stringify(state.PROPS)}, PROPIDs: ${JSON.stringify(
              state.PROPIDs,
            )} };`,
          }}
        />
        {scripts && scripts.map((src, index) => <script key={index} src={src} async />)}
      </body>
    </html>
  )
}
