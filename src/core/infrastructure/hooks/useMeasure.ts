import { useCallback, useState } from 'react';
import { GetMeasuresUseCase } from '@core/domain/useCases/GetMeasures';
import { handleErrorFirestore } from '@utils/helpers/handleErrors';
import { FirebaseError } from 'firebase/app';
import { useToast } from './useToast';
import { useMeasureStore } from '@core/infrastructure/store/measureStore';
import { CreateMesureForm } from '../validators/createMeasureSchema';
import { CreateMeasureUseCase } from '@core/domain/useCases/CreateMeasure';

export const useMeasure = () => {
  const [isloading, setIsLoading] = useState(false);
  const { show: showToast } = useToast();
  const {
    setMeasureList,
    setMeasureLengthList,
    setMeasureMassList,
    measureList,
    measureMassList,
    measureLengthList,
  } = useMeasureStore();

  const fetchMeasures = async () => {
    setIsLoading(true);

    try {
      const measures = await new GetMeasuresUseCase().execute();
      const measuresLength = await new GetMeasuresUseCase().execute('length');
      const mesuresMass = await new GetMeasuresUseCase().execute('mass');

      setMeasureList(measures);
      setMeasureLengthList(measuresLength);
      setMeasureMassList(mesuresMass);
    } catch (error) {
      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  };

  const createMeasure = async (
    values: CreateMesureForm,
    successCallback?: (measureDoc: string) => void,
  ) => {
    const { acronym, multiple, title, type } = values;

    setIsLoading(true);

    try {
      const measureDoc = await new CreateMeasureUseCase().execute({
        acronym,
        multiple,
        title,
        type,
      });

      await fetchMeasures();

      successCallback && successCallback(measureDoc);
    } catch (error) {
      console.log(error);

      let message = 'something went wrong';

      if (error instanceof FirebaseError) {
        message = handleErrorFirestore(error);
      }

      showToast({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  };

  const infoMeasure = (measureDoc: string) => {
    return measureList?.find(measure => measure.doc === measureDoc);
  };

  const getMeasureMassDefault = useCallback(() => {
    return measureMassList?.find(item => item.multiple === 1) || null;
  }, [measureMassList]);

  const getMeasureLenghtDefault = useCallback(() => {
    return measureLengthList?.find(item => item.multiple === 1) || null;
  }, [measureLengthList]);

  return {
    infoMeasure,
    fetchMeasures,
    createMeasure,
    getMeasureMassDefault,
    getMeasureLenghtDefault,
    isloading,
  };
};
