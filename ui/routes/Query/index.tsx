import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from './query.graphql'
import { useTitle, useMetaTag } from 'ui/components/HeadProvider';

export function QueryRoute(props: RouteComponentProps) {
  const { data, loading } = useQuery<{ helloWorld: string }>(gql)
  useMetaTag({ name: 'author', content: 'Kristian F Jones'})
  useTitle('Query')

  return (
    <div>
      <h1>Query</h1>
      <span>{!loading && data && data.helloWorld}</span>
    </div>
  )
}
