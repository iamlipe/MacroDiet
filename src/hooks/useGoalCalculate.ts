import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useToast } from './useToast';

export const useGoalCalculate = () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation<NavPropsLogged>();
  const { show: showToast } = useToast();

  const inititalValuesGoalCalculate = useMemo(() => {
    return {
      height: '',
      wieght: '',
      actitvityLevel: '',
      goalWeight: '',
      goalBodyFat: '',
      time: '',
    };
  }, []);

  const goalCalculateSchema = useMemo(
    () =>
      Yup.object().shape({
        height: Yup.string().required(),
        wieght: Yup.string().required(),
        actitvityLevel: Yup.string().required(),
        goalWeight: Yup.string().required(),
        goalBodyFat: Yup.string().required(),
        time: Yup.string().required(),
      }),
    [],
  );

  const handleGoalCalculate = useCallback(() => {
    try {
      setLoading(true);

      navigate('GoalResult');
    } catch (error) {
      showToast({ type: 'error', message: 'something went wrong' });
    } finally {
      setLoading(false);
    }
  }, [navigate, showToast]);

  return {
    inititalValuesGoalCalculate,
    goalCalculateSchema,
    handleGoalCalculate,
    loading,
  };
};
