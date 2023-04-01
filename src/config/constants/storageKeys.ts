export const storageKeys = {
  userData: '@macros:user/data',
  lastScheduledMealNotification: '@macros:user/lastScheduledMealNotification',
};

export type StorageKeys = keyof typeof storageKeys;

export const rootKeys = { ...storageKeys };
