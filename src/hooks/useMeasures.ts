import { useCallback, useState } from 'react';
import { useMeasureStore } from '@stores/index';
import { IMeasure, Measure } from '@services/firebase/models/measure';
import useHandleError from './useHandleError';
import firestore from '@react-native-firebase/firestore';

export interface ICreateMeasure {
  acronym?: string;
  title: string;
  type: 'mass' | 'length';
  quantity: number;
}

const useMeasures = () => {
  const [loading, setLoading] = useState(false);
  const {
    allMeasures,
    setAllMeasures,
    setMeasuresMass,
    setMeasuresLenght,
    setMeasureLenghtDefault,
    setMeasureMassDefault,
  } = useMeasureStore();
  const { handleFirestoreError } = useHandleError();

  const getMeasures = useCallback(async () => {
    try {
      setLoading(false);

      const data = await firestore().collection('Measures').get();

      const measures: IMeasure[] = data.docs.map(doc => {
        const measure = doc.data();

        return {
          doc: doc.id,
          multiple: measure.multiple,
          type: measure.type,
          title: measure.title,
        };
      });

      setAllMeasures(measures);
    } catch (error) {
      handleFirestoreError(error);
    } finally {
      setLoading(false);
    }
  }, [handleFirestoreError, setAllMeasures]);

  const getMesuresMass = useCallback(async () => {
    try {
      setLoading(false);

      const data = await firestore()
        .collection('Measures')
        .where('type', '==', 'mass')
        .get();

      const measures: IMeasure[] = data.docs.map(doc => {
        const measure = doc.data();

        return {
          doc: doc.id,
          multiple: measure.multiple,
          type: measure.type,
          title: measure.title,
        };
      });

      const measureMassDefault = measures.find(
        measure => measure.multiple === 1,
      );

      setMeasureMassDefault(measureMassDefault);
      setMeasuresMass(measures);
    } catch (error) {
      handleFirestoreError(error);
    } finally {
      setLoading(false);
    }
  }, [handleFirestoreError, setMeasureMassDefault, setMeasuresMass]);

  const getMesuresLength = useCallback(async () => {
    try {
      setLoading(false);

      const data = await firestore()
        .collection('Measures')
        .where('type', '==', 'length')
        .get();

      const measures: IMeasure[] = data.docs.map(doc => {
        const measure = doc.data();

        return {
          doc: doc.id,
          multiple: measure.multiple,
          type: measure.type,
          title: measure.title,
        };
      });

      const measureLengthDefault = measures.find(
        measure => measure.multiple === 1,
      );

      setMeasureLenghtDefault(measureLengthDefault);
      setMeasuresLenght(measures);
    } catch (error) {
      handleFirestoreError(error);
    } finally {
      setLoading(false);
    }
  }, [handleFirestoreError, setMeasureLenghtDefault, setMeasuresLenght]);

  const getMeasure = (doc: string) => {
    return allMeasures.find(measure => measure.doc === doc);
  };

  const createMeasure = useCallback(
    async ({ quantity, title, type, acronym }: ICreateMeasure) => {
      try {
        setLoading(false);

        const newMeasure = new Measure({
          acronym: acronym || null,
          type,
          title: `${title} (${quantity}g)`,
          multiple: 1 / quantity,
        });

        const measure = await firestore()
          .collection('Measures')
          .add(newMeasure);

        return measure.id;
      } catch (error) {
        handleFirestoreError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleFirestoreError],
  );

  return {
    getMeasures,
    getMeasure,
    createMeasure,
    getMesuresMass,
    getMesuresLength,
    loading,
  };
};

export default useMeasures;
