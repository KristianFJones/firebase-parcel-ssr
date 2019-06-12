import React, { createContext } from 'react';

const PageContext = createContext({} as any);

export const withPageContext = (Component: any) => (props: any) => {
  return (
    <PageContext.Provider value={{...props}}>
      <Component {...props} />
    </PageContext.Provider>
  );
};

export default PageContext;