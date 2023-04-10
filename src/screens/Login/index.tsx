import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';
import { useLogin } from '@hooks/index';
import { Background, Header, Link } from '@components/index';
import {
  StyledScroll,
  StyledButtonLogin,
  StyledSubtitle,
  StyledTitle,
} from './styles';

const Login = () => {
  const { goBack, navigate: navigateAuth } = useNavigation<NavPropsAuth>();
  const { loginWithGoogle, loading } = useLogin();

  return (
    <Background>
      <Header left={{ iconName: 'arrow-left', press: goBack }} title="login" />
      <StyledScroll>
        <StyledTitle>Bem-vindo de volta!</StyledTitle>
        <StyledSubtitle>
          Faça login para acessar sua conta e continuar de onde parou.
        </StyledSubtitle>

        <StyledButtonLogin
          title="Google"
          icon={{ name: 'google', position: 'left' }}
          onPress={loginWithGoogle}
        />

        <StyledButtonLogin
          title="Email"
          icon={{ name: 'mail', position: 'left' }}
          onPress={() => navigateAuth('LoginWithEmail')}
        />

        <Link
          title="Cadastrar-se"
          position="center"
          onPress={() => navigateAuth('Register')}
          disabled={loading}
        />
      </StyledScroll>
    </Background>
  );
};

export default Login;
