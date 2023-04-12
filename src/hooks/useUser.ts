import { IInfo, IUser, User } from '@services/firebase/models/user';
import { useCallback, useState } from 'react';
import {
  useActivityStore,
  useGenderStore,
  useMeasureStore,
  useUserStore,
} from '@stores/index';
import { useNavigation } from '@react-navigation/native';
import {
  CreateUserStackParamsList,
  NavPropsCreateUser,
} from '@routes/createUserStack';
import { calculateNutritionalInfo } from '@utils/nutritionalInfo';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import useHandleError from './useHandleError';
import useToast from './useToast';
import useLoader from './useLoader';
import { ICreatedUser } from '@stores/user';
import { defaultPreferences } from '@__mocks__/users';
import { formatMeasureToQuantityDefaultMeasure } from '@utils/format';

interface IHandleForm {
  values: Partial<IInfo>;
  navigateTo: keyof CreateUserStackParamsList;
}

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const { acitivities } = useActivityStore();
  const { genders } = useGenderStore();
  const { measuresMass, measuresLength } = useMeasureStore();
  const { setCreateUser, login, userCreate, user, setUser } = useUserStore();
  const { handleFirestoreError } = useHandleError();
  const { show: showLoading, hide: hideLoading } = useLoader();
  const { show: showToast } = useToast();
  const { navigate: navigateCreateUser } = useNavigation<NavPropsCreateUser>();

  const handleInfoUser = useCallback(
    (data: Partial<IUser>) => {
      const birthDate = new Date(data.info.birthDate.milliseconds);

      return {
        activityLevel: acitivities.find(
          item => item.doc === data.info.activityDoc,
        ),
        age: moment(new Date()).diff(birthDate, 'years'),
        gender: genders.find(item => item.doc === data.info.genderDoc),
        height: formatMeasureToQuantityDefaultMeasure(
          data.info.height,
          measuresLength,
        ),
        weight:
          formatMeasureToQuantityDefaultMeasure(
            data.info.weight,
            measuresMass,
          ) / 1000,
        weightGoal:
          formatMeasureToQuantityDefaultMeasure(
            data.info.goalWeight,
            measuresMass,
          ) / 1000,
        timeInWeeks: data.info.timeInWeeks,
      };
    },
    [acitivities, genders, measuresLength, measuresMass],
  );

  const handleFormCreateUser = useCallback(
    ({ values, navigateTo }: IHandleForm) => {
      try {
        setCreateUser(values);
        navigateCreateUser(navigateTo);
      } catch (error) {
        showToast({ type: 'error', message: 'something went wrong' });
      }
    },
    [navigateCreateUser, setCreateUser, showToast],
  );

  const createUser = useCallback(async () => {
    try {
      const {
        doc,
        activityDoc,
        genderDoc,
        birthDate,
        height,
        weight,
        goalWeight,
        timeInWeeks,
      } = userCreate as unknown as ICreatedUser;

      setLoading(true);
      showLoading();

      const newUser = new User({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        info: {
          activityDoc,
          birthDate,
          genderDoc,
          height,
          weight,
          goalWeight,
          timeInWeeks,
        },
        preferences: defaultPreferences,
      });

      await firestore().collection('Users').doc(doc).set(newUser);

      const infoUser = handleInfoUser(newUser);

      const nutritionInfo = calculateNutritionalInfo({
        activityLevelFactor: infoUser.activityLevel.factor,
        age: infoUser.age,
        gender: infoUser.gender.title,
        height: infoUser.height,
        weight: infoUser.weight,
        weightGoal: infoUser.weightGoal,
        timeInWeeks: infoUser.timeInWeeks,
      });

      login({ ...newUser, nutritionInfo });
    } catch (error) {
      handleFirestoreError(error);
    } finally {
      hideLoading();
    }
  }, [
    handleFirestoreError,
    handleInfoUser,
    hideLoading,
    login,
    showLoading,
    user?.email,
    user?.lastName,
    user?.name,
    user?.phone,
    user?.photo,
    userCreate,
  ]);

  const updateUser = useCallback(
    async (data: Partial<IUser>) => {
      try {
        const updatedUser = {
          name: data.name?.split(' ').splice(0, 1)[0] || user.name,
          lastName: data.name?.split(' ').splice(1).join(' ') || user.lastName,
          ...user,
          ...data,
        };

        setLoading(true);

        await firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update(updatedUser);

        const infoUser = handleInfoUser(updatedUser);

        const nutritionInfo = calculateNutritionalInfo({
          activityLevelFactor: infoUser.activityLevel.factor,
          age: infoUser.age,
          gender: infoUser.gender.title,
          height: infoUser.height,
          weight: infoUser.weight,
          timeInWeeks: infoUser.timeInWeeks,
          weightGoal: infoUser.weightGoal,
        });

        setUser({ ...updatedUser, nutritionInfo });
      } catch (error) {
        handleFirestoreError(error);
        setLoading(false);
      } finally {
      }
    },
    [handleFirestoreError, handleInfoUser, setUser, user],
  );

  return {
    handleInfoUser,
    updateUser,
    loading,
    handleFormCreateUser,
    createUser,
  };
};

export default useUser;
