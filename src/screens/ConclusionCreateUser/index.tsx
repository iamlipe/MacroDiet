import React from 'react';
import { useCreateUser } from '@hooks/index';
import { Background, Button } from '@components/index';
import {
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const ConclusionCreateUser = () => {
  const { createUser } = useCreateUser();

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
            icon={{ name: 'long-arrow-right' }}
            onPress={createUser}
          />
        </StyledWrapperButtonSubmit>
      </StyledScroll>
    </Background>
  );
};

export default ConclusionCreateUser;
