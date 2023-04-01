import { useCallback } from 'react';
import { useToast } from './useToast';

export const useHandleError = () => {
  const { show: showToast } = useToast();

  const handleAuthError = useCallback(
    error => {
      if (error.message) {
        showToast({
          type: 'error',
          message: error.code,
        });
      } else {
        showToast({
          type: 'error',
          message: 'something went wrong',
        });
      }
    },
    [showToast],
  );

  return { handleAuthError };
};