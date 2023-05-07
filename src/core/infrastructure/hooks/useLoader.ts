import { useContext } from 'react';
import { LoaderContext } from '@/core/presentation/contexts/LoaderContext';

export const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw Error('Not have context');
  }

  return context;
};
