export const storageKeys = {
  user: '@macroDiet:user',
  lastTimeUpdateWeight: '@macroDiet:lastTimeUpdateWeight',
  lastMealsDayCreated: '@macroDiet:lastMealsDayCreated',
};

export type StorageKeys = keyof typeof storageKeys;

export const rootKeys = { ...storageKeys };
