import { measures as measuresData } from '@__mocks__/measures';
import { useMeasureStore } from '@stores/measure';
import { useCallback, useState } from 'react';
import { useToast } from './useToast';

interface GetMeasureByIdProps {
  id: string;
  measure: keyof typeof measuresData.data;
}

export const useMeasures = () => {
  const [loading, setLoading] = useState(false);
  const { setMeasures } = useMeasureStore();
  const { show: showToast } = useToast();

  const getMeasures = useCallback(async () => {
    try {
      setLoading(false);
      setMeasures(measuresData.data);
    } catch (error) {
      showToast({ type: 'error', message: '' });
    } finally {
      setLoading(false);
    }
  }, [setMeasures, showToast]);

  const getMeasureById = ({ measure, id }: GetMeasureByIdProps) => {
    return measuresData.data[measure].find(item => item.id === id);
  };

  return { getMeasures, getMeasureById, loading };
};
