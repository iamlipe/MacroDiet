import { create } from 'zustand';

type State = {
  isSync: boolean | null;
  setIsSync: (isSync: boolean) => void;
};

const useSyncStore = create<State>(set => ({
  isSync: null,
  setIsSync: (isSync: boolean) => set(() => ({ isSync })),
}));

export default useSyncStore;
