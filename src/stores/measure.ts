import { IMeasure } from '@services/firebase/models/measure';
import { create } from 'zustand';

interface Measures {
  mass: IMeasure[];
  length: IMeasure[];
}

type State = {
  measures: Measures | null;
  setMeasures: (measures: Measures) => void;
};

export const useMeasureStore = create<State>(set => ({
  measures: null,
  setMeasures: (measures: Measures) => set(() => ({ measures })),
}));
