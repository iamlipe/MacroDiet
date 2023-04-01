import { IGender } from '@services/firebase/models/gender';

interface GerderData {
  data: IGender[];
}

export const gender: GerderData = {
  data: [
    {
      id: '1',
      title: 'Homem',
    },
    {
      id: '2',
      title: 'Mulher',
    },
  ],
};
