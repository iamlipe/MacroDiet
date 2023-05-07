import React, { createContext, ReactNode, useCallback, useState } from 'react';
import Loader from '@/core/presentation/shared/Loader';

interface ILoaderContext {
  show: () => void;
  hide: () => void;
}

export const LoaderContext = createContext<ILoaderContext | null>(null);

interface ILoaderProvider {
  children: ReactNode;
}

export const LoaderProvider = ({ children }: ILoaderProvider) => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <LoaderContext.Provider value={{ show, hide }}>
      {children}

      <Loader visible={visible} />
    </LoaderContext.Provider>
  );
};
