import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface WaterProps {
  doc: string;
  userDoc: string;
  goal: number;
  quantity: number;
  time: { nanoseconds: number; milliseconds: number };
}

export class Water implements Omit<WaterProps, 'doc'> {
  public userDoc: string;
  public goal: number;
  public quantity: number;
  public time: { nanoseconds: number; milliseconds: number };

  constructor(water: Omit<WaterProps, 'doc'>) {
    this.userDoc = water.userDoc;
    this.goal = water.goal;
    this.quantity = water.quantity;
    this.time = water.time;
  }
}

export const buildSchemaWater = (
  raw: FirebaseFirestoreTypes.DocumentData,
): WaterProps => {
  return {
    doc: raw.doc,
    userDoc: raw.userDoc,
    goal: raw.goal,
    quantity: raw.quantity,
    time: raw.time,
  };
};
