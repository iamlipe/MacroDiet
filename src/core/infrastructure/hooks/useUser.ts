import moment from 'moment';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useToast } from './useToast';
import { InfoProps, User } from '@core/domain/models/User';
import { useUserStore } from '@core/infrastructure/store/userStore';
import {
  CreateUserStackParamsList,
  NavPropsCreateUser,
} from '@core/presentation/routes/createUser';
import { calculateNutritionalInfo } from '@utils/helpers/nutritionalInfo';
import { useActivityStore } from '@core/infrastructure/store/activityStore';
import { useMeasureStore } from '@core/infrastructure/store/measureStore';
import { useGenderStore } from '@core/infrastructure/store/genderStore';
import { formatMeasureToDefault } from '@utils/helpers/format';
import { CreateUserUseCase } from '@core/domain/useCases/CreateUser';
import { FirebaseError } from 'firebase/app';
import { handleErrorFirestore } from '@utils/helpers/handleErrors';
import { useLoader } from './useLoader';
import { UpdateUserUseCase } from '@core/domain/useCases/UpdateUser';
import { GetUserCase } from '@core/domain/useCases/GetUser';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const { setFormCreateUser, formCreateUser, setUser } = useUserStore();
  const { show: showToast } = useToast();
  const { show: showLoader, hide: hideLoader } = useLoader();
  const { navigate: navigateCreateUser } = useNavigation<NavPropsCreateUser>();
  const { acitivityList } = useActivityStore();
  const { measureMassList, measureLengthList } = useMeasureStore();
  const { genderList } = useGenderStore();

  const handleFormCreateUser = (
    values: Partial<InfoProps>,
    navigateTo: keyof CreateUserStackParamsList,
  ) => {
    try {
      setFormCreateUser(values);
      navigateCreateUser(navigateTo);
    } catch (error) {
      showToast({ type: 'error', message: 'something went wrong' });
    }
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
      weightGoal:
        formatMeasureToDefault(data?.goalWeight, measureMassList || []) / 1000,
      timeInWeeks: data.timeInWeeks,
    };
  };

  const fetchUser = async () => {
    setLoading(true);

    try {
      const user = await new GetUserCase().execute();

      const info = handleInfoUser(user.info);

      if (info.activityLevel && info.gender) {
        const nutritionalInfo = calculateNutritionalInfo({
          activityLevelFactor: info.activityLevel.factor,
          age: info.age,
          gender: info.gender.title,
          height: info.height,
          weight: info.weight,
          weightGoal: info.weightGoal,
          timeInWeeks: info.timeInWeeks,
        });

        setUser({ ...user, nutritionalInfo });
      }
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    setLoading(true);
    showLoader();

    try {
      const user = await new CreateUserUseCase().execute({
        info: formCreateUser as InfoProps,
      });

      const info = handleInfoUser(user.info);

      if (info.activityLevel && info.gender) {
        const nutritionalInfo = calculateNutritionalInfo({
          activityLevelFactor: info.activityLevel.factor,
          age: info.age,
          gender: info.gender.title,
          height: info.height,
          weight: info.weight,
          weightGoal: info.weightGoal,
          timeInWeeks: info.timeInWeeks,
        });

        setUser({ ...user, nutritionalInfo });
      }
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
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
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleFormCreateUser,
    fetchUser,
    handleInfoUser,
    createUser,
    updateUser,
  };
};
