import { IGender } from '@services/firebase/models/gender';

interface IGerderData {
  data: Array<IGender>;
}

export const gender: IGerderData = {
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
