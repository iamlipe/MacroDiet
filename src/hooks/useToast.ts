import { ToastContext } from '@context/ToastContext';
import { useContext } from 'react';

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error('Not have context');
  }

  return context;
};

export default useToast;
