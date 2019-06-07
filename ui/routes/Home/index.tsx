import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { useTitle, useMetaTag } from 'ui/components/HeadProvider';
import { useKeywords } from 'ui/components/JSONLD';

export function HomeRoute(props: RouteComponentProps) {
  useKeywords(['Firebase', 'React', 'Firebase React', 'KristianFJones', 'Defrex', 'TypeScript'])
  useMetaTag({ name: 'author', content: 'Defrex'})
  useTitle('Index')
  return (
    <div>
      <h1>Index</h1>
    </div>
  )
}
