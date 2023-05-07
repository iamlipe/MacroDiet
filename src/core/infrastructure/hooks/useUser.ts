import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { calculateNutritionalInfo } from '@/utils/helpers/nutritionalInfo';
import { formatMeasureToDefault } from '@/utils/helpers/format';
import { InfoProps, NotificationsProps, User } from '@/core/domain/models/User';
import {
  CreateUserStackParamsList,
  NavPropsCreateUser,
} from '@/core/presentation/routes/createUser';
import { CreateUserUseCase } from '@/core/domain/services/firebase/useCases/CreateUser';
import { UpdateUserUseCase } from '@/core/domain/services/firebase/useCases/UpdateUser';
import { GetUserUseCase } from '@/core/domain/services/firebase/useCases/GetUser';
import {
  CreateUserProps,
  useUserStore,
} from '@/core/infrastructure/store/userStore';
import { useActivityStore } from '@/core/infrastructure/store/activityStore';
import { useMeasureStore } from '@/core/infrastructure/store/measureStore';
import { useGenderStore } from '@/core/infrastructure/store/genderStore';
import { useToast } from '@/core/infrastructure/hooks/useToast';
import { useLoader } from '@/core/infrastructure/hooks/useLoader';
import { useMealTime } from '@/core/infrastructure/hooks/useMealTime';
import moment from 'moment';
import { LastTimeUpdateWeightCache } from '@/core/domain/cache/LastTimeUpdateWeight';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const { setFormCreateUser, formCreateUser, setUser, user } = useUserStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { navigate: navigateCreateUser } = useNavigation<NavPropsCreateUser>();
  const { acitivityList } = useActivityStore();
  const { measureMassList, measureLengthList } = useMeasureStore();
  const { genderList } = useGenderStore();
  const { createDefaultMealTimes } = useMealTime();

  const checkformIsFilledOut = useMemo(() => {
    if (
      formCreateUser?.activityDoc &&
      formCreateUser?.birthDate &&
      formCreateUser?.genderDoc &&
      formCreateUser?.goalWeight &&
      formCreateUser?.height &&
      formCreateUser?.timeInWeeks &&
      formCreateUser?.weight
    ) {
      return formCreateUser as CreateUserProps;
    }

    return null;
  }, [formCreateUser]);

  const checkLastTimeUpdateWeight = async (
    callback: (resp: boolean) => void,
  ) => {
    const lastTimeUpdate = await new LastTimeUpdateWeightCache().read();

    if (!lastTimeUpdate) return callback(false);

    const dateLastTimeUpdate = moment(lastTimeUpdate);
    const sevenDaysAgo = moment().subtract(7, 'days');

    console.log(dateLastTimeUpdate);

    return callback(!dateLastTimeUpdate.isBefore(sevenDaysAgo));
  };

  const handleFormCreateUser = (
    values: Partial<InfoProps>,
    navigateTo: keyof CreateUserStackParamsList,
  ) => {
    setFormCreateUser(values);
    navigateCreateUser(navigateTo);
  };

  const handleInfoUser = (data: InfoProps) => {
    const birthDate = new Date(data.birthDate?.milliseconds);

    return {
      activityLevel: acitivityList?.find(item => item.doc === data.activityDoc),
      age: moment(new Date()).diff(birthDate, 'years'),
      gender: genderList?.find(item => item.doc === data.genderDoc),
      height: formatMeasureToDefault(data?.height, measureLengthList || []),
      weight:
        formatMeasureToDefault(data?.weight, measureMassList || []) / 1000,
      goalWeight:
        formatMeasureToDefault(data?.goalWeight, measureMassList || []) / 1000,
      timeInWeeks: data.timeInWeeks,
    };
  };

  const fetchUser = async () => {
    setLoading(true);

    try {
      const data = await new GetUserUseCase().execute();

      if (!data) {
        return showToast({ type: 'error', message: 'User not found' });
      }

      const info = handleInfoUser(data.info);

      if (info.activityLevel && info.gender) {
        const nutritionalInfo = calculateNutritionalInfo({
          activityLevelFactor: info.activityLevel.factor,
          age: info.age,
          gender: info.gender.title,
          height: info.height,
          weight: info.weight,
          goalWeight: info.goalWeight,
          timeInWeeks: info.timeInWeeks,
        });

        setUser({ ...data, nutritionalInfo });
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    setLoading(true);
    showLoader();

    try {
      if (checkformIsFilledOut) {
        const data = await new CreateUserUseCase().execute({
          info: {
            activityDoc: checkformIsFilledOut.activityDoc,
            birthDate: checkformIsFilledOut.birthDate,
            genderDoc: checkformIsFilledOut.genderDoc,
            goalWeight: checkformIsFilledOut.goalWeight,
            height: checkformIsFilledOut.height,
            timeInWeeks: checkformIsFilledOut.timeInWeeks,
            weight: checkformIsFilledOut.weight,
          },
          typeAccount: checkformIsFilledOut.typeAccount,
        });

        await createDefaultMealTimes();

        const info = handleInfoUser(data.info);

        await new LastTimeUpdateWeightCache().save(new Date().toDateString());

        if (info.activityLevel && info.gender) {
          const nutritionalInfo = calculateNutritionalInfo({
            activityLevelFactor: info.activityLevel?.factor,
            age: info.age,
            gender: info.gender?.title,
            height: info.height,
            weight: info.weight,
            goalWeight: info.goalWeight,
            timeInWeeks: info.timeInWeeks,
          });

          setUser({ ...data, nutritionalInfo });
        }
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const updateUser = async (values: Partial<User>) => {
    setLoading(true);

    try {
      await new UpdateUserUseCase().execute(values);
      await fetchUser();
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateNotifications = async (values: NotificationsProps) => {
    setLoading(true);

    try {
      if (user?.preferences) {
        await new UpdateUserUseCase().execute({
          preferences: { ...user?.preferences, notifications: values },
        });

        await fetchUser();
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error.message || 'something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleFormCreateUser,
    fetchUser,
    handleInfoUser,
    updateNotifications,
    checkLastTimeUpdateWeight,
    createUser,
    updateUser,
  };
};
