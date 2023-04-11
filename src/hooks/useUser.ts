import { IUser } from '@services/firebase/models/user';
import { useCallback, useState } from 'react';
import {
  useActivityStore,
  useGenderStore,
  useGoalStore,
  useMeasureStore,
  useUserStore,
} from '@stores/index';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import useHandleError from './useHandleError';

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const { acitivities } = useActivityStore();
  const { genders } = useGenderStore();
  const { goals } = useGoalStore();
  const { measuresMass, measuresLength } = useMeasureStore();
  const { setUser } = useUserStore();
  const { handleFirestoreError } = useHandleError();

  const updateUserInfo = useCallback(
    async (userInfo: { name: string; email: string }) => {
      try {
        const updatedUser = {
          name: userInfo.name.split(' ').splice(0, 1)[0],
          lastName: userInfo.name.split(' ').splice(1).join(' '),
          email: userInfo.email,
        };

        setLoading(true);

        await firestore()
          .collection('Users')
          .doc(auth().currentUser.uid)
          .update(updatedUser);

        setUser(updatedUser);
      } catch (error) {
        handleFirestoreError(error);
        setLoading(false);
      } finally {
      }
    },
    [handleFirestoreError, setUser],
  );

  const getUserActivityLevel = (activityDoc: string) => {
    return acitivities.find(item => item.doc === activityDoc);
  };

  const getUserAge = (birthDate: Date) => {
    return moment(new Date()).diff(birthDate, 'years');
  };

  const getUserGender = (genderDoc: string) => {
    return genders.find(item => item.doc === genderDoc);
  };

  const getUserGoal = (goalDoc: string) => {
    return goals.find(item => item.doc === goalDoc);
  };

  const getUserHeight = (height: { quantity: number; measureDoc: string }) => {
    const measureMultiple = measuresLength.find(
      item => item.doc === height.measureDoc,
    ).multiple;

    return height.quantity * (measureMultiple || 0);
  };

  const getUserWeight = (weigth: { quantity: number; measureDoc: string }) => {
    const measureMultiple = measuresMass.find(
      item => item.doc === weigth.measureDoc,
    ).multiple;

    return (weigth.quantity * (measureMultiple || 0)) / 1000;
  };

  const handleInfoUser = (data: IUser) => {
    return {
      activityLevel: getUserActivityLevel(data.info.activityDoc),
      age: getUserAge(new Date(data.info.birthDate.milliseconds)),
      gender: getUserGender(data.info.genderDoc),
      goal: getUserGoal(data.info.goalDoc),
      height: getUserHeight(data.info.height),
      weight: getUserWeight(data.info.weigth),
    };
  };

  return { handleInfoUser, updateUserInfo, loading };
};

export default useUser;
