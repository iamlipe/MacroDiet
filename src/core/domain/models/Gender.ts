import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface GenderProps {
  doc: string;
  title: 'male' | 'female';
}

export class Gender implements Omit<GenderProps, 'doc'> {
  public title: 'male' | 'female';

  constructor(activity: Omit<GenderProps, 'doc'>) {
    this.title = activity.title;
  }
}

export const buildSchemaGender = (
  raw: FirebaseFirestoreTypes.DocumentData,
): GenderProps => {
  return {
    doc: raw.doc,
    title: raw.title,
  };
};
