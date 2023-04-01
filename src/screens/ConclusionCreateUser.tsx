import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Label } from '@components/Label';
import { Scroll } from '@components/Scroll';
import { useCreateUser } from '@hooks/useCreateUser';
import React from 'react';
import { useTheme } from 'styled-components/native';

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
