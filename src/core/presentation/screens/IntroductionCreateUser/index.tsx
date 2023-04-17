import React from 'react';
import { NavPropsCreateUser } from '@core/presentation/routes/createUser';
import { useNavigation } from '@react-navigation/native';
import Button from '@core/presentation/shared/Button';
import Background from '@core/presentation/shared/Background';
import {
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const IntroductionCreateUser: React.FC = () => {
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
            onPress={() => navigateCreateUser('GenderCreateUser')}
          />
        </StyledWrapperButtonSubmit>
      </StyledScroll>
    </Background>
  );
};

export default IntroductionCreateUser;
