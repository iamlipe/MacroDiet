import { useCallback } from 'react';

interface IGetUserNutritionInfo {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  activityLevelFactor: number;
  goalFactor: number;
}

const useNutritionInfo = () => {
  const getUserNutritionInfo = useCallback(
    ({
      activityLevelFactor,
      age,
      gender,
      goalFactor,
      height,
      weight,
    }: IGetUserNutritionInfo) => {
      const bmrConstant = gender === 'male' ? 5 : -161;
      const bmr = 10 * weight + 6.25 * height - 5 * age + bmrConstant;
      const tdee = bmr * activityLevelFactor;
      const kcalGoal = tdee * goalFactor;
      // FIXME: factor prot
      const prot = weight * 1.6;
      const carb = (kcalGoal * 0.5) / 4;
      const fat = (kcalGoal * 0.25) / 9;
      const fiber = (kcalGoal * 0.14) / 4;
      const sodium = (kcalGoal * 0.02) / 2.5;

      return {
        kcalGoal,
        prot,
        carb,
        fat,
        fiber,
        sodium,
      };
    },
    [],
  );

  return { getUserNutritionInfo };
};

export default useNutritionInfo;
