import { https } from 'firebase-functions'
import { apiServer } from './api'
import { hotUiServer } from './ui';

export const hello = https.onRequest((req, res) => {
  res.send('Hello Functions')
})

export const ui = https.onRequest(async (req, res) => hotUiServer(req, res))

export const api = https.onRequest(apiServer)
