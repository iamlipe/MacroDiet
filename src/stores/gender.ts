import { IGender } from '@services/firebase/models/gender';
import { create } from 'zustand';

type State = {
  genders: IGender[] | null;
  setGenders: (genders: IGender[]) => void;
};

const useGenderStore = create<State>(set => ({
  genders: null,
  setGenders: (genders: IGender[]) => set(() => ({ genders })),
}));

export default useGenderStore;
