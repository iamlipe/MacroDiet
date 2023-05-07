import React from 'react';
import { NavPropsCreateUser } from '../../routes/createUser';
import { useNavigation } from '@react-navigation/native';
import {
  StyledImage,
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';
import Button from '../../shared/Button';

const IntroductionCreateUserView: React.FC = () => {
  const { navigate: navigateCreateUser } = useNavigation<NavPropsCreateUser>();

  return (
    <StyledScroll>
      <StyledTitle>
        O caminho para uma dieta saudável e equilibrada começa aqui!
      </StyledTitle>

      <StyledSubtitle>
        Preencha formulário a seguir para montarmos seu diário de macros
        personalizado, responda com cuidado para atendermos suas necessidades
        alimentares com precisão.
      </StyledSubtitle>

      <StyledImage
        resizeMode="contain"
        source={require('@/assets/images/illustration-one.png')}
      />

      <StyledWrapperButtonSubmit>
        <Button
          title="Começar"
          icon={{ name: 'long-right' }}
          onPress={() => navigateCreateUser('GenderCreateUser')}
        />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default IntroductionCreateUserView;
