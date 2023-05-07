import { useSyncStore } from '@/core/infrastructure/store/syncStore';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { useLogin } from '@/core/infrastructure/hooks/useLogin';

export const useSync = () => {
  const { show: showToast } = useToast();
  const { setIsSync } = useSyncStore();
  const { rememberLogin } = useLogin();

  const sync = async () => {
    setIsSync(true);

    try {
      await rememberLogin();
    } catch (error) {
      showToast({ type: 'error', message: 'Something went wrong' });
    } finally {
      setTimeout(() => setIsSync(false), 1000);
    }
  };

  return { sync };
};
