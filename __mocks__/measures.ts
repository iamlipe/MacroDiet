import { IMeasure } from '@services/firebase/models/measure';

interface MeasuresData {
  data: {
    mass: IMeasure[];
    length: IMeasure[];
  };
}

export const measures: MeasuresData = {
  data: {
    mass: [
      {
        id: '1',
        acronym: 'g',
        title: 'gram',
        multiple: 1,
      },
      {
        id: '2',
        acronym: 'kg',
        title: 'kilograma',
        multiple: 1000,
      },
    ],
    length: [
      {
        id: '2',
        acronym: 'cm',
        title: 'centimeter',
        multiple: 1,
      },
    ],
  },
};
