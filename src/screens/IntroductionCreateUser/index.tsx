import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsCreateUser } from '@routes/createUserStack';
import { Background, Button } from '@components/index';
import {
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const IntroductionCreateUser = () => {
  const { navigate: navigateCreateUser } = useNavigation<NavPropsCreateUser>();

  return (
    <Background>
      <StyledScroll>
        <StyledTitle>
          O caminho para uma dieta saudável e equilibrada começa aqui!
        </StyledTitle>

        <StyledSubtitle>
          Preencha este formulário para montarmos seu diário de macros
          personalizado, responda com cuidado para atendermos suas necessidades
          alimentares com precisão.
        </StyledSubtitle>

        <StyledWrapperButtonSubmit>
          <Button
            title="Começar"
            icon={{ name: 'long-arrow-right' }}
            onPress={() => navigateCreateUser('GoalCreateUser')}
          />
        </StyledWrapperButtonSubmit>
      </StyledScroll>
    </Background>
  );
};

export default IntroductionCreateUser;
