import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import Button from '@/core/presentation/shared/Button';
import {
  StyledDescription,
  StyledScroll,
  StyledInfo,
  StyledLabel,
  StyledWrapperButtonSubmit,
  StyledContainerGoalInfo,
} from './styles';

const GoalView = () => {
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();
  const { handleInfoUser } = useUser();

  const userData = useMemo(() => {
    if (!user?.info) return null;

    return handleInfoUser(user.info);
  }, [handleInfoUser, user]);

  return (
    <StyledScroll>
      <StyledDescription>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDescription>

      <StyledContainerGoalInfo>
        <StyledLabel>Altura:</StyledLabel>
        <StyledInfo>{`${userData?.height} cm`}</StyledInfo>

        <StyledLabel>Peso:</StyledLabel>
        <StyledInfo>{`${userData?.weight} kg`}</StyledInfo>

        <StyledLabel>Idade:</StyledLabel>
        <StyledInfo>{`${userData?.age} anos`}</StyledInfo>

        <StyledLabel>Genero:</StyledLabel>
        <StyledInfo>{userData?.gender?.title}</StyledInfo>

        <StyledLabel>Nivel de atividade fisica:</StyledLabel>
        <StyledInfo>{userData?.activityLevel?.title}</StyledInfo>

        <StyledLabel>Meta:</StyledLabel>
        <StyledInfo>{`${userData?.goalWeight} kg`}</StyledInfo>

        <StyledLabel>Tempo:</StyledLabel>
        <StyledInfo>{`${userData?.timeInWeeks} semanas`}</StyledInfo>
      </StyledContainerGoalInfo>

      <StyledWrapperButtonSubmit>
        <Button title="Editar" onPress={() => navigateLogged('EditGoal')} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default GoalView;
