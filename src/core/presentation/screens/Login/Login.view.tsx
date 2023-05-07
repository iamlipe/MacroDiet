import React from 'react';
import { useLogin } from '@/core/infrastructure/hooks/useLogin';
import { NavPropsAuth } from '@/core/presentation/routes/auth';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import Link from '@/core/presentation/shared/Link';
import {
  StyledButtonLogin,
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
} from './styles';

const LoginView: React.FC = () => {
  const { navigate: navigateAuth } = useNavigation<NavPropsAuth>();
  const { loginWithGoogle, isLoading } = useLogin();

  const renderGoogleSVG = () => (
    <Svg width={24} height={24} fill="none">
      <Path
        fill="#4285F4"
        fillRule="evenodd"
        d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.642h6.458a5.52 5.52 0 0 1-2.394 3.622v3.01h3.878c2.269-2.088 3.578-5.165 3.578-8.82Z"
        clipRule="evenodd"
      />
      <Path
        fill="#34A853"
        fillRule="evenodd"
        d="M12 24c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.11-6.715-4.947H1.276v3.11A11.995 11.995 0 0 0 12 24Z"
        clipRule="evenodd"
      />
      <Path
        fill="#FBBC05"
        fillRule="evenodd"
        d="M5.285 14.28A7.213 7.213 0 0 1 4.91 12c0-.79.136-1.56.376-2.28V6.61H1.276A11.995 11.995 0 0 0 0 12c0 1.936.464 3.77 1.276 5.39l4.01-3.11Z"
        clipRule="evenodd"
      />
      <Path
        fill="#EA4335"
        fillRule="evenodd"
        d="M12 4.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C17.951 1.19 15.235 0 12 0 7.31 0 3.25 2.69 1.276 6.61l4.01 3.11C6.228 6.884 8.874 4.773 12 4.773Z"
        clipRule="evenodd"
      />
    </Svg>
  );

  return (
    <StyledScroll>
      <StyledTitle>Bem-vindo!</StyledTitle>
      <StyledSubtitle>
        Faça login para acessar sua conta e continuar de onde parou.
      </StyledSubtitle>

      <StyledButtonLogin
        title="Google"
        iconComponent={() => renderGoogleSVG()}
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
        disabled={isLoading}
      />
    </StyledScroll>
  );
};

export default LoginView;
