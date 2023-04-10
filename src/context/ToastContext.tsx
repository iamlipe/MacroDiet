import React, { createContext, ReactNode, useCallback, useState } from 'react';
import { IToast } from '@components/Toast';
import { Toast } from '@components/index';

interface IToastContext {
  show: (toast: IToast) => void;
  hide: () => void;
}

export const ToastContext = createContext<IToastContext | null>(null);

interface IToastProvider {
  children: ReactNode;
}

export const ToastProvider = ({ children }: IToastProvider) => {
  const [toast, setToast] = useState<IToast | null>(null);

  const show = useCallback((data: IToast) => {
    setToast(data);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const hide = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}

      {toast && <Toast type={toast.type} message={toast.message} />}
    </ToastContext.Provider>
  );
};
