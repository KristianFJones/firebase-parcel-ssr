import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useTitle, useMetaTag } from 'ui/components/HeadProvider';

export function HomeRoute(props: RouteComponentProps) {
  useMetaTag({ name: 'author', content: 'Defrex'})
  useTitle('Index')
  return (
    <div>
      <h1>Index</h1>
    </div>
  )
}
