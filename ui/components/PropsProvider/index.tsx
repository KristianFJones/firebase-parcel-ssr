import React, { createContext, useContext, ReactNode, useState } from 'react'
import { Request } from 'express'
import { globalHistory } from '@reach/router'

export interface PathPropsObject {
  path: string
  props: any
}

export let Props: Promise<any> | undefined

export type getProp = (req?: import('express').Request) => Promise<any>

export const setProps = (props: Promise<any> | any) => {
  Props = props
}

export const resetProps = () => {
  Props = undefined
}

interface PropContextType {
  props: any
  sessionProps: PathPropsObject[]
  setSTF: (prop: (req?: Request) => Promise<any>, id: number) => void
  req?: Request
}

export const PropContext = createContext<PropContextType>({
  props: Props,
  sessionProps: [],
  setSTF: () => {},
  req: undefined,
})

PropContext.displayName = 'PropContext'

interface PropProviderProps {
  children: ReactNode
  req?: Request
  props: any
  sessionProps: PathPropsObject[]
  path: string
}

export let test: Function

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const PropProvider = ({ req, children, props, sessionProps, path }: PropProviderProps) => {
  const [prop, setProp] = useState(props)

  test = (test: any) => setProp(test)

  globalHistory.listen(async (c) => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === c.location.pathname)

    if (oldProps) setProp(oldProps.props || {})
    else {
      await timeout(50)
      if (typeof (await Props) === 'undefined') return
      sessionProps.push({ path: c.location.pathname, props: (await Props) || {} })
      setProp((await Props) || {})
    }
    Props = undefined
  })

  return (
    <PropContext.Provider
      value={{
        sessionProps: sessionProps,
        props: prop,
        setSTF: async (prop, id) => {
          const oldProps = sessionProps.find(
            ({ path: pth }) => pth === (req ? req.path : globalHistory.location.pathname),
          )

          if (oldProps) Props = oldProps.props
          else Props = prop(req)
        },
        req,
      }}
    >
      {children}
    </PropContext.Provider>
  )
}

let currentPageId = 0

export const resetPageID = () => {
  currentPageId = 0
}

export const useProps = (props: (req?: Request) => Promise<any>) => {
  const [id] = useState(currentPageId++)
  const { setSTF } = useContext(PropContext)
  setSTF(props, id)
}
