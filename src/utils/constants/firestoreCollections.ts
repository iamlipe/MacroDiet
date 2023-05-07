export const firestoreColections = {
  users: 'Users',
  activities: 'Activities',
  foods: 'Foods',
  gender: 'Gender',
  meals: 'Meals',
  measures: 'Measures',
  mealTimes: 'MealTimes',
  water: 'Water',
};

export type FirestoreColections = keyof typeof firestoreColections;

export const rootCollections = { ...firestoreColections };
