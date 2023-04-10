import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import useToast from './useToast';

const useGoalCalculate = () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation<NavPropsLogged>();
  const { show: showToast } = useToast();

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
    handleGoalCalculate,
    loading,
  };
};

export default useGoalCalculate;
