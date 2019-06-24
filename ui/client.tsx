import React from 'react'
import { preloadReady } from 'react-loadable'
import ReactDOM, { Renderer } from 'react-dom'
import { App as AppComponent } from '~/App'
import { ConfigProvider } from '~/components/ConfigProvider'
import { HeadProvider } from './components/HeadProvider'
import { setStylesTarget } from 'typestyle'
import { PropProvider, test, Props } from './components/PropsProvider'
import HomeRoute from '~routes/Home'

let STF: any

let sessionProps: any[] = []

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  const StyleElement = document.getElementById('styles')
  if (StyleElement) setStylesTarget(StyleElement)
  STF = window.APP_STATE.PROPS

  sessionProps = window.APP_STATE.SESSIONPROPS
  renderFunction(
    <ConfigProvider {...window.APP_STATE.CONFIG}>
      <HeadProvider tags={[]}>
        <PropProvider props={STF} sessionProps={sessionProps} path={window.location.pathname}>
          <App />
        </PropProvider>
      </HeadProvider>
    </ConfigProvider>,
    document.getElementById('app'),
  )
}

preloadReady().then(() => render(ReactDOM.hydrate, AppComponent))

const hot = (module as any).hot
if (hot && hot.accept) {
  hot.accept(async () => {
    window.APP_STATE.SESSIONPROPS = []
    await timeout(50)
    test(await Props)
    render(ReactDOM.render, require('ui/App').App)
  })
}
