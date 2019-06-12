import React, { 
  FunctionComponent 
} from 'react';
import { 
  RouteComponentProps 
} from '@reach/router';
import { withPageContext } from './pageContext';
import Imported from 'react-imported-component'

const test = Imported<any, any>(() => import('./initApollo'))


type Props = { component: FunctionComponent | typeof test } & RouteComponentProps;

const Route: FunctionComponent<Props> = ({ component, ...rest }) => {
  const Component = withPageContext(component);
  return (
    <Component {...rest} />
  );
};

export default Route;