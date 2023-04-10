import { IMeasure } from '@services/firebase/models/measure';
import { create } from 'zustand';

type State = {
  allMeasures: Array<IMeasure>;
  setAllMeasures: (allMeasures: Array<IMeasure>) => void;
  measuresMass: Array<IMeasure>;
  measuresLength: Array<IMeasure>;
  measureMassDefault: IMeasure;
  measureLengthDefault: IMeasure;
  setMeasuresMass: (measuresMass: Array<IMeasure>) => void;
  setMeasuresLenght: (measuresLength: Array<IMeasure>) => void;
  setMeasureMassDefault: (measureMassDefault: IMeasure) => void;
  setMeasureLenghtDefault: (measureMassDefault: IMeasure) => void;
};

const useMeasureStore = create<State>(set => ({
  allMeasures: null,
  setAllMeasures: (allMeasures: Array<IMeasure>) =>
    set(() => ({ allMeasures })),
  measuresMass: null,
  setMeasuresMass: (measuresMass: Array<IMeasure>) =>
    set(() => ({ measuresMass })),
  measureLengthDefault: null,
  setMeasuresLenght: (measuresLength: Array<IMeasure>) =>
    set(() => ({ measuresLength })),
  measureMassDefault: null,
  setMeasureMassDefault: (measureMassDefault: IMeasure) =>
    set(() => ({ measureMassDefault })),
  measuresLength: null,
  setMeasureLenghtDefault: (measureLengthDefault: IMeasure) =>
    set(() => ({ measureLengthDefault })),
}));

export default useMeasureStore;
