import { ToastContext } from '@/core/presentation/contexts/ToastContext';
import { useContext } from 'react';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error('Not have context');
  }

  return context;
};
