import { NormalizedCacheObject } from 'apollo-boost'
import React from 'react'
import { Config } from './components/ConfigProvider'

export interface AppState {
  APOLLO_STATE: NormalizedCacheObject
  CONFIG: Config
}

interface DocumentProps {
  html: string
  scripts?: string[]
  css?: string
  state: AppState
}

export function Document({ html, css, scripts, state }: DocumentProps) {
  return (
    <>
      <div id='app' dangerouslySetInnerHTML={{ __html: html }} />

      <script
        dangerouslySetInnerHTML={{
          __html: `window.APP_STATE = { APOLLO_STATE:${JSON.stringify(state.APOLLO_STATE).replace(
            /</g,
            '\\u003c',
          )}, CONFIG: ${JSON.stringify(state.CONFIG)} };`,
        }}
      />
      {scripts && scripts.map((src, index) => <script key={index} src={src} async />)}
    </>
  )
}
