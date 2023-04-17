import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@core/presentation/routes/auth';
import Background from '@core/presentation/shared/Background';
import Button from '@core/presentation/shared/Button';
import { StyledDescription, StyledScroll, StyledTitle } from './styles';

const Onboarding: React.FC = () => {
  const { navigate: navigateAuth } = useNavigation<NavPropsAuth>();

  return (
    <Background>
      <StyledScroll>
        <StyledTitle>Titulo</StyledTitle>
        <StyledDescription>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </StyledDescription>

        <Button
          title="Login ou cadastro"
          onPress={() => navigateAuth('Login')}
        />
      </StyledScroll>
    </Background>
  );
};

export default Onboarding;
