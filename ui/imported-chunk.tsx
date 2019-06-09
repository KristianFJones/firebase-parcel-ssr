/* eslint-disable */
/* tslint:disable */

import { assignImportedComponents } from 'react-imported-component'

const applicationImports = [() => import('./routes/Loading')]

assignImportedComponents(applicationImports)
export default applicationImports
