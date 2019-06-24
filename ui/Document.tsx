import React from 'react'
import { Config } from 'ui/components/ConfigProvider'
import { PathPropsObject } from '~components/PropsProvider'

export interface AppState {
  CONFIG: Config
  PROPS: any
  SESSIONPROPS: PathPropsObject[]
}

interface DocumentProps {
  html: string
  scripts?: string[]
  css?: string
  state: AppState
  head: JSX.Element[]
  cssSRC: string[]
}

export function Document({ html, css, scripts, state, head, cssSRC }: DocumentProps) {
  return (
    <html lang='en-US'>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {head}
        {scripts &&
          scripts
            .reverse()
            .map((src, index) => src && <link rel='preload' href={src} as='script' key={index} />)}
        {scripts && (
          <link rel='stylesheet' type='text/css' href={scripts[0].replace('.js', '.css')} />
        )}
        {cssSRC &&
          cssSRC.map((src, index) => (
            <link rel='stylesheet' type='text/css' href={src} key={index} />
          ))}

        {css ? <style id='styles'>{css}</style> : null}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: html }} />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_STATE = ${JSON.stringify(state)};`,
          }}
        />
        {scripts && scripts.reverse().map((src, index) => <script key={index} src={src} async />)}
      </body>
    </html>
  )
}
