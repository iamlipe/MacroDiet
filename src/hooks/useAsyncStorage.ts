import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootKeys, StorageKeys } from '@config/constants/storageKeys';

const useAsyncStorage = () => {
  const save = async (key: StorageKeys, data: string) => {
    await AsyncStorage.setItem(rootKeys[key], data);
  };

  const read = async (key: StorageKeys) => {
    return await AsyncStorage.getItem(rootKeys[key]);
  };

  const remove = async (key: StorageKeys) => {
    await AsyncStorage.removeItem(rootKeys[key]);
  };

  return { save, read, remove };
};

export default useAsyncStorage;
