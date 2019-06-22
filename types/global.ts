import { AppState } from 'ui/Document'
import { RouteComponentProps } from '@reach/router'
import { FunctionComponent } from 'react'
import workbox from 'workbox-sw'

declare global {
  interface Window {
    APP_STATE: AppState
    workbox: workbox
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace NodeJS {
    interface Process {
      browser: boolean
    }
  }

  declare
  /* eslint-enable @typescript-eslint/no-namespace */
}

export interface FirebaseRoute<P = {}> extends FunctionComponent<RouteComponentProps & P> {}
