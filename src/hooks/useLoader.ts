import { LoaderContext } from '@context/LoaderContext';
import { useContext } from 'react';

const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw Error('Not have context');
  }

  return context;
};

export default useLoader;
