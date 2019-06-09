import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import ReactDOM from 'react-dom'
import { ConfigProvider } from './components/ConfigProvider'
import { initApollo } from './lib/initApollo'
import { HeadProvider } from './components/HeadProvider'
import { rehydrateMarks } from 'react-imported-component'
import './imported-chunk'
import App from './App'

const element = document.getElementById('app')
const app = (
  <HeadProvider tags={[]}>
    <ConfigProvider {...window.APP_STATE.CONFIG}>
      <ApolloProvider
        client={initApollo({
          baseUrl: window.APP_STATE.CONFIG.baseUrl,
          initialState: window.APP_STATE.APOLLO_STATE,
        })}
      >
        <App />
      </ApolloProvider>
    </ConfigProvider>
  </HeadProvider>
)

const TM = 1000

console.log('waiting')
setTimeout(function() {
  // rehydrate the bundle marks
  console.log('loading')
  rehydrateMarks().then(() => {
    console.log('loaded...')
    setTimeout(function() {
      console.log('rendering')
      // In production, we want to hydrate instead of render
      // because of the server-rendering
      if (1 || process.env.NODE_ENV === 'production') {
        ReactDOM.hydrate(app, element)
      } else {
        ReactDOM.render(app, element)
      }
    }, TM)
  })
}, TM)
