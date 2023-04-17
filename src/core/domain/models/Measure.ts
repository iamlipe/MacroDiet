import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface MeasureProps {
  doc: string;
  acronym?: string;
  title: string;
  type: 'mass' | 'length';
  multiple: number;
}

export class Measure implements Omit<MeasureProps, 'doc'> {
  public acronym?: string;
  public title: string;
  public type: 'mass' | 'length';
  public multiple: number;

  constructor(measure: Omit<MeasureProps, 'doc'>) {
    this.acronym = measure.acronym;
    this.title = measure.title;
    this.type = measure.type;
    this.multiple = measure.multiple;
  }
}

export const buildSchemaMeasure = (
  raw: FirebaseFirestoreTypes.DocumentData,
): MeasureProps => {
  return {
    doc: raw.doc,
    title: raw.title,
    multiple: raw.multiple,
    type: raw.type,
    acronym: raw.acronym,
  };
};
