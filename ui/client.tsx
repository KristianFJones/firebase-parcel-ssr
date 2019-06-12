import React from 'react'
import ReactDOM, { Renderer } from 'react-dom'
import { rehydrateMarks } from 'react-imported-component';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function() {
    const worker = await navigator.serviceWorker.register('/service-worker.ts', { scope: '/' })
    console.log('SW registered: ', worker)
  })
}

async function render(renderFunction: Renderer, App: typeof import('./App').App) {
  const ConfigImport = import('./components/ConfigProvider')
  const HeadImport = import('./components/HeadProvider')

  const [{ ConfigProvider }, { HeadProvider }] = await Promise.all([ConfigImport, HeadImport])
  await rehydrateMarks()
  renderFunction(
    <HeadProvider tags={[]}>
      <ConfigProvider {...window.APP_STATE.CONFIG}>
        <App />
      </ConfigProvider>
    </HeadProvider>,
    document.getElementById('app'),
  )
}

render(ReactDOM.hydrate, require('./App').App)

const hot = (module as any).hot
if (hot && hot.accept) {
  hot.accept(() => {
    render(ReactDOM.render, require('./App').App)
  })
}
