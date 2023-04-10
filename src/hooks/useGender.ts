import { useCallback, useState } from 'react';
import { useGenderStore } from '@stores/index';
import { IGender } from '@services/firebase/models/gender';
import useToast from './useToast';
import firestore from '@react-native-firebase/firestore';

const useGender = () => {
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

  return { getGenders, loading };
};

export default useGender;
