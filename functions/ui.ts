import 'isomorphic-unfetch'
import chokidar from 'chokidar'
import { Request, Response } from 'express'
import { readFile } from 'fs-extra'
import { config } from 'firebase-functions'

async function getUiServer() {
  const assetPaths = '../assets.json'
  const uiServer2 = (await import(assetPaths)).default
  return (await import(`../${uiServer2.server}`)).default
}

export async function hotUiServer(req: Request, res: Response) {
  if (req.url.includes('/app/'))
    return res.status(200).send((await readFile(`./${req.url.replace('/app/', '')}`)).toString())
  else {
    let uiServer = await getUiServer()

    if (process.env.NODE_ENV === 'development')
      chokidar
        .watch('../', {
          ignoreInitial: true,
          awaitWriteFinish: { stabilityThreshold: 100 },
        })
        .on('all', async () => {
          process.stdout.write('Reloading UI Server...')
          uiServer = await getUiServer()
          process.stdout.write('✅\n')
        })

    return uiServer(
      req,
      res,
      ...Object.entries(config().ui || {}).map(([a, b]) => ({
        [a.replace(/_(\D)/, (a, b) => b.toUpperCase())]: b,
      })),
    )
  }
}
