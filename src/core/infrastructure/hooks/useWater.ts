import { useState } from 'react';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { GetWaterDayUseCase } from '@/core/domain/services/firebase/useCases/GetWaterDay';
import { CreateWaterDayUseCase } from '@/core/domain/services/firebase/useCases/CreateWaterDay';
import { GetAuthUseCase } from '@/core/domain/services/firebase/useCases/GetAuth';
import { Water } from '@/core/domain/models/Water';
import { useWaterStore } from '../store/waterStore';
import { useUserStore } from '../store/userStore';
import { useUser } from './useUser';
import { UpdateWaterUseCase } from '@/core/domain/services/firebase/useCases/UpdateWater';
import { useMealStore } from '../store/mealStore';

export const useWater = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { show: showToast } = useToast();
  const { setWaterDay, waterDay } = useWaterStore();
  const { user } = useUserStore();
  const { handleInfoUser } = useUser();
  const { selectedDateMeals } = useMealStore();

  const fetchWaterDay = async () => {
    setIsLoading(false);

    try {
      const water = await new GetWaterDayUseCase().execute(selectedDateMeals);

      if (!water) {
        return await createWaterDay();
      }

      setWaterDay(water);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createWaterDay = async () => {
    setIsLoading(false);

    try {
      const auth = await new GetAuthUseCase().execute();

      const date = new Date();

      const createdWater = new Water({
        goal: user?.info ? handleInfoUser(user?.info).weight * 35 : 2000,
        quantity: 0,
        time: {
          milliseconds: date.getTime(),
          nanoseconds: date.getTime() * 1000000,
        },
        userDoc: auth.uid,
      });

      await new CreateWaterDayUseCase().execute(createdWater);

      const water = await new GetWaterDayUseCase().execute(selectedDateMeals);

      setWaterDay(water);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addWaterDay = async (quantity: number) => {
    setIsLoading(false);

    try {
      if (waterDay) {
        await new UpdateWaterUseCase().execute({
          ...waterDay,
          quantity,
        });

        const water = await new GetWaterDayUseCase().execute(selectedDateMeals);

        setWaterDay(water);
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchWaterDay, createWaterDay, addWaterDay, isLoading };
};
