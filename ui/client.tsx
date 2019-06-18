import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { App as AppComponent } from 'ui/App'
import { ConfigProvider } from 'ui/components/ConfigProvider'
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
  const StyleElement = document.getElementById('styles')
  if (StyleElement) setStylesTarget(StyleElement)
  STF = window.APP_STATE.PROPS
  renderFunction(
    <HeadProvider tags={[]}>
      <ConfigProvider {...window.APP_STATE.CONFIG}>
        <PropProvider props={STF} ids={window.APP_STATE.PROPIDs}>
          <App />
        </PropProvider>
      </ConfigProvider>
    </HeadProvider>,
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
