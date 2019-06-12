import { Link, Router } from '@reach/router'
import React from 'react'
import { useConfig } from './components/ConfigProvider'
import LoadingComponent from './components/Loading';
import importComponent from 'react-imported-component';

const Home = importComponent(() => import('./routes/Home'), {
  LoadingComponent
})

const Example = importComponent(() => import('./routes/Example'), {
  LoadingComponent
})


export const renderAboutPage = () => <Home />


export default function App() {
  const { baseUrl } = useConfig()
  return (
    <div>
      <ul>
        <li>
          <Link to='/test/'>Index</Link>
          <Link to='/test/example'>Example</Link>
        </li>
      </ul>
      <h3>{baseUrl}</h3>
      <Router basepath='test'>
        <Home path='/' />
        <Example path='/example' />
      
      </Router>
    </div>
  )
}
