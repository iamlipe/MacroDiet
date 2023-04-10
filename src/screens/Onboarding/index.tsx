import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';
import { Background, Button } from '@components/index';
import {
  StyledScroll,
  StyledContent,
  StyledDescription,
  StyledTitle,
} from './styles';

const Onboarding = () => {
  const { navigate: navigateAuth } = useNavigation<NavPropsAuth>();

  return (
    <Background>
      <StyledScroll>
        <StyledContent>
          <StyledTitle>Titulo</StyledTitle>
          <StyledDescription>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </StyledDescription>

          <Button
            title="Login ou cadastro"
            onPress={() => navigateAuth('Login')}
          />
        </StyledContent>
      </StyledScroll>
    </Background>
  );
};

export default Onboarding;
