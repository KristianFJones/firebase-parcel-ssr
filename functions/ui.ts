import { Request, Response } from 'express'
import { config } from 'firebase-functions'
import 'isomorphic-unfetch'

export async function hotUiServer() {
  const tst = '../public/server.js'
  const { default: uiServer } = await import(tst)

  return (req: Request, res: Response) =>
    uiServer(
      req,
      res,
      ...Object.entries(config().ui).map(([a, b]) => ({
        [a.replace(/_(\D)/, (a, b) => b.toUpperCase())]: b,
      })),
    )
}
