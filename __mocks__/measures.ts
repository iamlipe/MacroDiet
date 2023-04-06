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
        doc: '1',
        acronym: 'g',
        title: 'gram',
        multiple: 1,
      },
      {
        doc: '2',
        acronym: 'kg',
        title: 'kilograma',
        multiple: 1000,
      },
    ],
    length: [
      {
        doc: '3',
        acronym: 'cm',
        title: 'centimeter',
        multiple: 1,
      },
    ],
  },
};
