
    /* eslint-disable */
    /* tslint:disable */
     
    import {assignImportedComponents} from 'react-imported-component';
    
    const applicationImports = [
      () => import('./routes/Example'),
      () => import('./routes/Home'),
      () => import('./routes/Query'),
    ];
    
    assignImportedComponents(applicationImports);
    export default applicationImports;