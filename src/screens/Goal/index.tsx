import React, { useMemo } from 'react';
import { NavPropsLogged } from '@routes/logged';
import { Background, Button, Header } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@stores/index';
import { useUser } from '@hooks/index';
import {
  StyledDescription,
  StyledScroll,
  StyledInfo,
  StyledLabel,
  StyledWrapperButtonSubmit,
  StyledContainerGoalInfo,
} from './styles';

const Goal = () => {
  const { goBack, navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();
  const { handleInfoUser } = useUser();

  const userData = useMemo(() => handleInfoUser(user), [handleInfoUser, user]);

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Objetivo"
      />

      <StyledScroll>
        <StyledDescription>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </StyledDescription>

        <StyledContainerGoalInfo>
          <StyledLabel>Altura:</StyledLabel>
          <StyledInfo>{`${userData.height} cm`}</StyledInfo>

          <StyledLabel>Peso:</StyledLabel>
          <StyledInfo>{`${userData.weight} kg`}</StyledInfo>

          <StyledLabel>Idade:</StyledLabel>
          <StyledInfo>{`${userData.age} anos`}</StyledInfo>

          <StyledLabel>Genero:</StyledLabel>
          <StyledInfo>{userData.gender.title}</StyledInfo>

          <StyledLabel>Nivel de atividade fisica:</StyledLabel>
          <StyledInfo>{userData.activityLevel.title}</StyledInfo>

          <StyledLabel>Meta:</StyledLabel>
          <StyledInfo>{`${userData.weightGoal} kg`}</StyledInfo>

          <StyledLabel>Tempo:</StyledLabel>
          <StyledInfo>{`${userData.timeInWeeks} semanas`}</StyledInfo>
        </StyledContainerGoalInfo>

        <StyledWrapperButtonSubmit>
          <Button title="Editar" onPress={() => navigateLogged('EditGoal')} />
        </StyledWrapperButtonSubmit>
      </StyledScroll>
    </Background>
  );
};

export default Goal;
