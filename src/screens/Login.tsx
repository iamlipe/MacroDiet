import React from 'react';
import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Label } from '@components/Label';
import { Scroll } from '@components/Scroll';
import { useLogin } from '@hooks/useLogin';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';

export const Login = () => {
  const { goBack, navigate: navigateAuth } = useNavigation<NavPropsAuth>();
  const { effects, fonts } = useTheme();
  const { loginWithGoogle, loginWithApple, loginWithFacebook } = useLogin();

  return (
    <Background>
      <Header left={{ iconName: 'arrow-left', press: goBack }} title="login" />
      <Scroll>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.md}>
          Bem-vindo de volta!
        </Label>

        <Label
          fontSize={fonts.size.s1}
          color={fonts.color.secundary}
          marginBottom={effects.spacing.hg}>
          Faça login para acessar sua conta e continuar de onde parou.
        </Label>

        <Button
          type="outlined"
          title="Google"
          icon={{ name: 'google', position: 'left' }}
          onPress={loginWithGoogle}
          marginBottom={effects.spacing.md}
        />

        {Platform.OS === 'ios' && (
          <Button
            type="outlined"
            title="Apple"
            icon={{ name: 'apple', position: 'left' }}
            onPress={loginWithApple}
            marginBottom={effects.spacing.md}
          />
        )}

        <Button
          type="outlined"
          title="Facebook"
          icon={{ name: 'facebook', position: 'left' }}
          onPress={loginWithFacebook}
          marginBottom={effects.spacing.md}
        />

        <Button
          type="outlined"
          title="Email"
          icon={{ name: 'mail', position: 'left' }}
          onPress={() => navigateAuth('LoginWithEmail')}
          marginBottom={effects.spacing.md}
        />

        <Button
          type="link"
          linkPosition="center"
          title="Cadastrar-se"
          onPress={() => navigateAuth('Register')}
        />
      </Scroll>
    </Background>
  );
};
