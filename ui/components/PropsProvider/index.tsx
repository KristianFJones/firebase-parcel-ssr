import React, { createContext, useContext, ReactNode, useState } from 'react'
import { Request } from 'express'
import { globalHistory } from '@reach/router'
import until from 'async-until'

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
  ids: number[]
  setSTF: (prop: (req?: Request) => Promise<any>, id: number) => void
  req?: Request
}

export const PropContext = createContext<PropContextType>({
  props: Props,
  ids: [],
  setSTF: () => {},
  req: undefined,
})

PropContext.displayName = 'PropContext'

interface PropProviderProps {
  children: ReactNode
  req?: Request
  props: any
  ids: number[]
}

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const PropProvider = ({ req, children, props, ids }: PropProviderProps) => {
  const [prop, setProp] = useState(props)

  globalHistory.listen(async () => {
    ids = []
    await until(async () => typeof (await Props) !== 'undefined')
    await timeout(50)

    setProp(await Props)
  })

  return (
    <PropContext.Provider
      value={{
        ids,
        props: prop,
        setSTF: async (prop, id) => {
          if (ids.includes(id)) return
          Props = prop(req)
          ids.push(id)
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
