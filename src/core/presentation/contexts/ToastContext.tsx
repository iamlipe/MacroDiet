import React, { createContext, ReactNode, useCallback, useState } from 'react';
import Toast, { ToastProps } from '@/core/presentation/shared/Toast';

interface IToastContext {
  show: (toast: ToastProps) => void;
  hide: () => void;
}

export const ToastContext = createContext<IToastContext | null>(null);

interface IToastProvider {
  children: ReactNode;
}

export const ToastProvider = ({ children }: IToastProvider) => {
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

      {toast && (
        <Toast close={hide} type={toast.type} message={toast.message} />
      )}
    </ToastContext.Provider>
  );
};
