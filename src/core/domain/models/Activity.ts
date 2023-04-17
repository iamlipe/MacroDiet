import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface ActivityProps {
  doc: string;
  title: string;
  factor: number;
  description?: string;
}

export class Activity implements Omit<ActivityProps, 'doc'> {
  public title: string;
  public factor: number;
  public description?: string;

  constructor(activity: Omit<ActivityProps, 'doc'>) {
    this.title = activity.title;
    this.factor = activity.factor;
    this.description = activity.description;
  }
}

export const buildSchemaActivity = (
  raw: FirebaseFirestoreTypes.DocumentData,
): ActivityProps => {
  return {
    doc: raw.doc,
    title: raw.title,
    factor: raw.factor,
    description: raw.description,
  };
};
