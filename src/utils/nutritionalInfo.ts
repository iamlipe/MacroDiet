interface IUserInfo {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  activityLevelFactor: number;
  weightGoal: number;
  timeInWeeks: number;
}

const MALE_BMR_CONSTANT_1 = 88.362;
const MALE_BMR_CONSTANT_2 = 13.397;
const MALE_BMR_CONSTANT_3 = 4.799;
const MALE_BMR_CONSTANT_4 = 5.677;
const FEMALE_BMR_CONSTANT_1 = 447.593;
const FEMALE_BMR_CONSTANT_2 = 9.247;
const FEMALE_BMR_CONSTANT_3 = 3.098;
const FEMALE_BMR_CONSTANT_4 = 4.33;
const FIBER = 25;
const SODIUM = 2;
const PROTEIN_CONSTANT = 0.3;
const FAT_CONSTANT = 0.3;
const CARB_CONSTANT = 0.4;
const CALORIES_PER_POUND = 7700;
const DAYS_WEEK = 7;
const PROTEIN_KCAL = 4;
const CARB_KCAL = 4;
const FAT_KCAL = 9;
const FIBER_KCAL = 2;

const calculateBMR = (
  gender: 'male' | 'female',
  height: number,
  weight: number,
  age: number,
) => {
  if (gender === 'male') {
    return (
      MALE_BMR_CONSTANT_1 +
      MALE_BMR_CONSTANT_2 * weight +
      MALE_BMR_CONSTANT_3 * height -
      MALE_BMR_CONSTANT_4 * age
    );
  } else {
    return (
      FEMALE_BMR_CONSTANT_1 +
      FEMALE_BMR_CONSTANT_2 * weight +
      FEMALE_BMR_CONSTANT_3 * height -
      FEMALE_BMR_CONSTANT_4 * age
    );
  }
};

const calculateTDEE = (bmr: number, activityLevelFactor: number) => {
  return bmr * activityLevelFactor;
};

const calculateKcalGoal = (
  weightGoal: number,
  weight: number,
  tdee: number,
  timeInWeeks: number,
  kcalDiff: number,
) => {
  if (weightGoal > weight) {
    return (
      (tdee * DAYS_WEEK * timeInWeeks + kcalDiff) / timeInWeeks / DAYS_WEEK
    );
  } else {
    return (
      (tdee * DAYS_WEEK * timeInWeeks - kcalDiff) / timeInWeeks / DAYS_WEEK
    );
  }
};

const calculateProtein = (kcal: number) => {
  return ((kcal - FIBER * FIBER_KCAL) * PROTEIN_CONSTANT) / PROTEIN_KCAL;
};

const calculateFat = (kcal: number) => {
  return ((kcal - FIBER * FIBER_KCAL) * FAT_CONSTANT) / FAT_KCAL;
};

const calculateCarb = (kcal: number) => {
  return ((kcal - FIBER * FIBER_KCAL) * CARB_CONSTANT) / CARB_KCAL;
};

export const calculateNutritionalInfo = (user: IUserInfo) => {
  const bmr = calculateBMR(user.gender, user.height, user.weight, user.age);
  const tdee = calculateTDEE(bmr, user.activityLevelFactor);
  const kcalDiff = Math.abs(
    (user.weightGoal - user.weight) * CALORIES_PER_POUND,
  );
  const kcal = calculateKcalGoal(
    user.weightGoal,
    user.weight,
    tdee,
    user.timeInWeeks,
    kcalDiff,
  );
  const kcalGoal = user.weightGoal === user.weight ? tdee : kcal;
  const fiber = FIBER;
  const sodium = SODIUM;
  const prot = calculateProtein(kcalGoal);
  const carb = calculateCarb(kcalGoal);
  const fat = calculateFat(kcalGoal);

  return {
    kcal,
    prot,
    carb,
    fat,
    fiber,
    sodium,
  };
};
