import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'ui/components/ConfigProvider'
import { HeadProvider } from './components/HeadProvider'

import { rehydrateMarks } from 'react-imported-component';
import { AppState } from './server';
import { ApolloProvider } from 'react-apollo-hooks';
import { initApollo } from './lib/initApollo';

import './imported' // eslint-disable-line
import App from './App'

const stateElement = document.getElementById('APP_STATE')
let data: AppState
if (stateElement) data = JSON.parse(stateElement.innerText)
else data = { CONFIG: { baseUrl: 'localhost:5000' }, APOLLO_STATE: {}}

export const hydrate = (app, element) => () => {
  ReactDOM.hydrate(app, element)
}

export const start = ({ isProduction, document, module, hydrate }) => {
  const element = document.getElementById('app')
  const app = (
    <HeadProvider tags={[]}>
      <ConfigProvider {...data.CONFIG}>
        <ApolloProvider client={initApollo({ baseUrl: data.CONFIG.baseUrl,
          initialState: data.APOLLO_STATE })}>
          <App />
        </ApolloProvider>
        
      </ConfigProvider>
    </HeadProvider>
  );
  if (isProduction) {
    // rehydrate the bundle marks from imported-components,
    // then rehydrate the react app
    rehydrateMarks().then(hydrate(app, element))
  } else {
    ReactDOM.render(app, element)
  }
}


const options = {
  isProduction: process.env.NODE_ENV === 'production',
  document: document,
  module: module,
  hydrate
}

start(options)