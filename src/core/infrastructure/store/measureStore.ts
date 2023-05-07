import { create } from 'zustand';
import { MeasureProps } from '@/core/domain/models/Measure';

type State = {
  measureList: Array<MeasureProps> | null;
  setMeasureList: (measureList: Array<MeasureProps>) => void;

  measureMassList: Array<MeasureProps> | null;
  setMeasureMassList: (measureMassList: Array<MeasureProps>) => void;

  measureLengthList: Array<MeasureProps> | null;
  setMeasureLengthList: (measureLengthList: Array<MeasureProps>) => void;
};

export const useMeasureStore = create<State>(set => ({
  measureList: null,
  setMeasureList: (measureList: Array<MeasureProps>) =>
    set(() => ({ measureList })),

  measureMassList: null,
  setMeasureMassList: (measureMassList: Array<MeasureProps>) =>
    set(() => ({ measureMassList })),

  measureLengthList: null,
  setMeasureLengthList: (measureLengthList: Array<MeasureProps>) =>
    set(() => ({ measureLengthList })),
}));
