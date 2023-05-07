import { useState } from 'react';
import { MealTimeProps } from '@/core/domain/models/MealTime';
import { IUser } from '@/core/domain/models/User';
import { GetMealTimesUseCase } from '@/core/domain/services/firebase/useCases/GetMealTimes';
import { CreateDefaultMealTimesUseCase } from '@/core/domain/services/firebase/useCases/CreateDefaultMealTimes';
import { CreateMealTimeUseCase } from '@/core/domain/services/firebase/useCases/CreateMealTime';
import { UpdateMealTimeUseCase } from '@/core/domain/services/firebase/useCases/UpdateMealTimes';
import { RemoveMealTimeUseCase } from '@/core/domain/services/firebase/useCases/RemoveMealTime';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useLoader } from '@/core/infrastructure/hooks/useLoader';
import { useToast } from '@/core/infrastructure/hooks/useToast';

export const useMealTime = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { user, setUser } = useUserStore();

  const fetchMealTimes = async () => {
    setIsLoading(true);

    try {
      const mealTimes = await new GetMealTimesUseCase().execute();

      const dataUser = user as IUser;

      setUser({
        ...dataUser,
        preferences: { ...dataUser?.preferences, mealTimes },
      });

      return mealTimes;
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createDefaultMealTimes = async () => {
    setIsLoading(true);

    try {
      await new CreateDefaultMealTimesUseCase().execute();
      await fetchMealTimes();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createMealTime = async (
    values: Omit<MealTimeProps, 'isActive' | 'doc' | 'userDoc'>,
  ) => {
    setIsLoading(true);

    try {
      await new CreateMealTimeUseCase().execute(values);

      await fetchMealTimes();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const changeActiveMealTime = async (doc: string, isActive: boolean) => {
    setIsLoading(true);

    try {
      await new UpdateMealTimeUseCase().execute({ doc, isActive });
      await fetchMealTimes();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateMealTime = async (values: MealTimeProps) => {
    setIsLoading(true);

    try {
      await new UpdateMealTimeUseCase().execute(values);
      await fetchMealTimes();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeMealTime = async (doc: string) => {
    setIsLoading(true);
    showLoader();

    try {
      await new RemoveMealTimeUseCase().execute(doc);
      await fetchMealTimes();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      hideLoader();
      setIsLoading(false);
    }
  };

  return {
    fetchMealTimes,
    createDefaultMealTimes,
    createMealTime,
    changeActiveMealTime,
    removeMealTime,
    updateMealTime,
    isLoading,
  };
};
