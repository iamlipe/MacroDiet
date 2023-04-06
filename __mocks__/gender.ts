import { IGender } from '@services/firebase/models/gender';

interface GerderData {
  data: IGender[];
}

export const gender: GerderData = {
  data: [
    {
      doc: '1',
      title: 'male',
    },
    {
      doc: '2',
      title: 'female',
    },
  ],
};
