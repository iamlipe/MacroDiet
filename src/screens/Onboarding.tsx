import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Label } from '@components/Label';
import { Scroll } from '@components/Scroll';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@routes/auth';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const Onboarding = () => {
  const { navigate: navigateAuth } = useNavigation<NavPropsAuth>();
  const { fonts, effects } = useTheme();

  return (
    <Background>
      <Scroll>
        <Container flex={1} justifyContent="flex-end">
          <Label
            fontFamily={fonts.family.medium}
            fontSize={fonts.size.s2}
            textAlign="center"
            marginBottom={effects.spacing.lg}>
            Titulo
          </Label>
          <Label
            fontSize={fonts.size.lg}
            textAlign="center"
            marginBottom={effects.spacing.hg}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </Label>

          <Button
            title="Login ou cadastro"
            onPress={() => navigateAuth('Login')}
          />
        </Container>
      </Scroll>
    </Background>
  );
};
