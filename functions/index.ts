import { https } from 'firebase-functions'
import { hotUiServer } from './ui'

const uiServerPromise = hotUiServer()
export const ui = https.onRequest(async (req, res) => {
  const uiServer = await uiServerPromise
  return uiServer(req, res)
})
