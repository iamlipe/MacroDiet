import React from 'react';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import Button from '@/core/presentation/shared/Button';
import {
  StyledImage,
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const ConclusionCreateUserView: React.FC = () => {
  const { createUser } = useUser();

  return (
    <StyledScroll>
      <StyledTitle>Seu plano de dieta personalizado está pronto!</StyledTitle>

      <StyledSubtitle>
        Clique no botão "Criar conta" abaixo e comece a cuidar da sua saúde com
        facilidade e eficiência.
      </StyledSubtitle>

      <StyledImage
        resizeMode="contain"
        source={require('@/assets/images/illustration-eight.png')}
      />

      <StyledWrapperButtonSubmit>
        <Button
          title="Criar conta"
          icon={{ name: 'long-right' }}
          onPress={createUser}
        />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default ConclusionCreateUserView;
