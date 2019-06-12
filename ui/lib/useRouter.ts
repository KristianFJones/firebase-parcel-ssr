import pageContext from './pageContext';
import { useContext } from 'react';
import { parse, parseUrl } from 'query-string';
const isServer = typeof(window) === 'undefined';

const useRouter = () => {
  const { location, ...rest } = useContext(pageContext);
  const queryParams = isServer ?  
    parseUrl(location.pathname).query : 
    parse(location.search);

  const query = {
    ...queryParams,
    ...rest,
  };

  return { query };
};

export default useRouter;