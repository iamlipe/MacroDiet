import { Toast, ToastProps } from '@components/Toast';
import React, { createContext, ReactNode, useCallback, useState } from 'react';

interface ToastContextProps {
  show: (toast: ToastProps) => void;
  hide: () => void;
}

export const ToastContext = createContext<ToastContextProps | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const show = useCallback((data: ToastProps) => {
    setToast(data);
    setTimeout(() => setToast(null), 5000);
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
