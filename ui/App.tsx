import { Link, Router } from '@reach/router'
import React from 'react'
import { useConfig } from 'ui/components/ConfigProvider'
import importedComponent from 'react-imported-component'

const Loader = importedComponent(() => import('./routes/Loading'))

export default function App() {
  const { baseUrl } = useConfig()
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Index</Link>
        </li>
        <li>
          <Link to='/example'>Example</Link>
        </li>
        <li>
          <Link to='/query'>Query</Link>
        </li>
        <li>
          <Link to='/load'>Load</Link>
        </li>
      </ul>
      <h3>{baseUrl}</h3>
      <Router>
        <Loader path='/load' />
      </Router>
    </div>
  )
}
