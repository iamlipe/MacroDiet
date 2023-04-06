import { useActivityStore } from '@stores/acitivity';
import { useGenderStore } from '@stores/gender';
import { useGoalStore } from '@stores/goal';
import { useMeasureStore } from '@stores/measure';
import { IUser } from '@services/firebase/models/user';
import moment from 'moment';

export const useUser = () => {
  const { acitivities } = useActivityStore();
  const { genders } = useGenderStore();
  const { goals } = useGoalStore();
  const { measures } = useMeasureStore();

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
    const measureMultiple = measures.length.find(
      item => item.doc === height.measureDoc,
    ).multiple;

    return height.quantity * (measureMultiple || 0);
  };

  const getUserWeight = (weigth: { quantity: number; measureDoc: string }) => {
    const measureMultiple = measures.mass.find(
      item => item.doc === weigth.measureDoc,
    ).multiple;

    return (weigth.quantity * (measureMultiple || 0)) / 1000;
  };

  const handleInfoUser = (user: IUser) => {
    return {
      activityLevel: getUserActivityLevel(user.info.activityDoc),
      age: getUserAge(new Date(user.info.birthDate.milliseconds)),
      gender: getUserGender(user.info.genderDoc),
      goal: getUserGoal(user.info.goalDoc),
      height: getUserHeight(user.info.height),
      weight: getUserWeight(user.info.weigth),
    };
  };

  return { handleInfoUser };
};
