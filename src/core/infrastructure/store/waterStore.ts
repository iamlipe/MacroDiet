import { WaterProps } from '@/core/domain/models/Water';
import { create } from 'zustand';

type State = {
  waterDay: WaterProps | null;
  setWaterDay: (waterDay: WaterProps) => void;
};

export const useWaterStore = create<State>(set => ({
  waterDay: null,
  setWaterDay: (waterDay: WaterProps) => set(() => ({ waterDay })),
}));
