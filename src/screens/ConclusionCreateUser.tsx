import React from 'react';
import { useCreateUser } from '@hooks/useCreateUser';
import { useTheme } from 'styled-components/native';
import {
  Background,
  Button,
  Container,
  Label,
  Scroll,
} from '@components/index';

export const ConclusionCreateUser = () => {
  const { createUser } = useCreateUser();
  const { fonts, effects } = useTheme();

  return (
    <Background>
      <Scroll>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.md}>
          O caminho para uma dieta saudável e equilibrada começa aqui!
        </Label>

        <Label
          fontSize={fonts.size.lg}
          color={fonts.color.secundary}
          marginBottom={effects.spacing.hg}>
          Preencha este formulário para montarmos seu diário de macros
          personalizado, responda com cuidado para atendermos suas necessidades
          alimentares com precisão.
        </Label>

        <Container flex={1} justifyContent="flex-end">
          <Button
            title="Começar"
            icon={{ name: 'long-arrow-right' }}
            onPress={createUser}
          />
        </Container>
      </Scroll>
    </Background>
  );
};
