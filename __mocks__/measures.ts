import { IMeasure } from 'deprecated/services/firebase/models/measure';

interface IMeasuresData {
  data: Array<IMeasure>;
}

export const measures: IMeasuresData = {
  data: [
    {
      doc: '1',
      acronym: 'g',
      title: 'gram',
      multiple: 1,
      type: 'mass',
    },
    {
      doc: '2',
      acronym: 'kg',
      title: 'kilograma',
      multiple: 1000,
      type: 'mass',
    },
    {
      doc: '3',
      acronym: 'cm',
      title: 'centimeter',
      multiple: 1,
      type: 'length',
    },
  ],
};
