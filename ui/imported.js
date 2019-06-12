
    /* eslint-disable */
    /* tslint:disable */
     
    import {assignImportedComponents} from 'react-imported-component';
    
    const applicationImports = [
      () => import('./routes/Example'),
      () => import('./routes/Home'),
    ];
    
    assignImportedComponents(applicationImports);
    export default applicationImports;