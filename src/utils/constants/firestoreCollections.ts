export const firestoreColections = {
  users: 'Users',
  activities: 'Activities',
  foods: 'Foods',
  gender: 'Gender',
  meals: 'Meals',
  measures: 'Measures',
};

export type FirestoreColections = keyof typeof firestoreColections;

export const rootCollections = { ...firestoreColections };
