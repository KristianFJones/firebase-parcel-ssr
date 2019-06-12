import { https } from 'firebase-functions'
import { readJSON } from 'fs-extra'
import { apiServer } from './api'
import { resolve } from 'path'

export const hello = https.onRequest((req, res) => {
  res.send('Hello Functions')
})

export const ui = https.onRequest(async (req, res) => {
  const stf = 'functions/test.json'
  const test = await readJSON(stf)
  const serverFilename = resolve(`${__dirname}${test.ui}`)
  const { hotUiServer } = await import(serverFilename)
  return hotUiServer(req, res)
})

export const api = https.onRequest(apiServer)
