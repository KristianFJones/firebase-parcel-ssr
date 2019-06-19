import React from 'react'
import { preloadReady } from 'react-loadable'
import ReactDOM, { Renderer } from 'react-dom'
import { App as AppComponent } from '~/App'
import { ConfigProvider } from '~/components/ConfigProvider'
import { HeadProvider } from './components/HeadProvider'
import { setStylesTarget } from 'typestyle'
import { PropProvider } from './components/PropsProvider'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function() {
    const worker = await navigator.serviceWorker.register('/service-worker.ts', { scope: '/' })
    console.log('SW registered: ', worker)
  })
}

let STF: any

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  await preloadReady()
  const StyleElement = document.getElementById('styles')
  if (StyleElement) setStylesTarget(StyleElement)
  STF = window.APP_STATE.PROPS
  renderFunction(
    <ConfigProvider {...window.APP_STATE.CONFIG}>
      <HeadProvider tags={[]}>
        <PropProvider props={STF} ids={window.APP_STATE.PROPIDs}>
          <App />
        </PropProvider>
      </HeadProvider>
    </ConfigProvider>,
    document.getElementById('app'),
  )
}

render(ReactDOM.hydrate, AppComponent)

const hot = (module as any).hot
if (hot && hot.accept) {
  hot.accept(() => {
    render(ReactDOM.render, require('ui/App').App)
  })
}
