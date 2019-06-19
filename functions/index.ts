import { https } from 'firebase-functions'
import { hotUiServer } from './ui'

export const ui = https.onRequest(hotUiServer)
