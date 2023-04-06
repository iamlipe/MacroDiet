import { useCallback, useState } from 'react';
import { useGenderStore } from '@stores/gender';
import { useToast } from './useToast';
import firestore from '@react-native-firebase/firestore';
import { IGender } from '@services/firebase/models/gender';

export const useGender = () => {
  const [loading, setLoading] = useState(false);
  const { setGenders } = useGenderStore();
  const { show: showToast } = useToast();

  const getGenders = useCallback(async () => {
    try {
      setLoading(true);

      const data = await firestore().collection('Gender').get();

      const genders: IGender[] = data.docs.map(doc => {
        const gender = doc.data();

        return {
          doc: doc.id,
          factor: gender.factor,
          title: gender.title,
        };
      });

      setGenders(genders);
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(true);
    }
  }, [setGenders, showToast]);

  const getGender = useCallback(() => {}, []);

  return { getGenders, getGender, loading };
};
