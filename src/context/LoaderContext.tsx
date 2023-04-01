import { Loader } from '@components/Loader';
import React, { createContext, ReactNode, useCallback, useState } from 'react';

interface LoaderContextProps {
  show: () => void;
  hide: () => void;
}

export const LoaderContext = createContext<LoaderContextProps | null>(null);

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
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
