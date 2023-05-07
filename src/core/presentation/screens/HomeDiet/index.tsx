import React, { useEffect, useState } from 'react';
import { useMeals } from '@/core/infrastructure/hooks/useMeals';
import { useFood } from '@/core/infrastructure/hooks/useFood';
import { useWater } from '@/core/infrastructure/hooks/useWater';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { NavPropsLogged } from '../../routes/logged';
import { useNavigation } from '@react-navigation/native';
import { useMealStore } from '@/core/infrastructure/store/mealStore';
import {
  StyledBodyModalUpdateWeight,
  StyledButtonCancelModalUpdateWeight,
} from './styles';
import Background from '@/core/presentation/shared/Background';
import Loading from '@/core/presentation/shared/Loading';
import HomeDietView from './HomeEdit.view';
import Modal from '../../shared/Modal';
import Button from '../../shared/Button';
import HorizontalDateList from '../../shared/HorizontalDateList';

const HomeDiet: React.FC = () => {
  const [showModalUpdateWeight, setShowModalUpdateWeight] = useState(false);
  const { fetchFoods } = useFood();
  const { fetchMealsDay, isLoading: isLoadingMeals } = useMeals();
  const { fetchWaterDay } = useWater();
  const { checkLastTimeUpdateWeight } = useUser();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { selectedDateMeals, setSelectedDateMeals } = useMealStore();

  useEffect(() => {
    fetchMealsDay();
    fetchWaterDay();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDateMeals]);

  useEffect(() => {
    fetchFoods();

    checkLastTimeUpdateWeight(resp => setShowModalUpdateWeight(resp));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <HorizontalDateList
        selectedDate={selectedDateMeals}
        setSelectedDate={setSelectedDateMeals}
      />

      {isLoadingMeals ? <Loading /> : <HomeDietView />}

      <Modal
        visible={showModalUpdateWeight}
        onClose={() => setShowModalUpdateWeight(false)}
        title={'Registre sua evolução'}>
        <StyledBodyModalUpdateWeight>
          Manter seu peso atualizado é fundamental para um acompanhamento
          preciso da sua evolução.
        </StyledBodyModalUpdateWeight>

        <StyledButtonCancelModalUpdateWeight
          title={'cancelar'}
          type="outlined"
          onPress={() => setShowModalUpdateWeight(false)}
        />

        <Button
          title={'atualizar'}
          onPress={() => {
            setShowModalUpdateWeight(false);
            navigateLogged('UpdateWeight');
          }}
        />
      </Modal>
    </Background>
  );
};

export default HomeDiet;
