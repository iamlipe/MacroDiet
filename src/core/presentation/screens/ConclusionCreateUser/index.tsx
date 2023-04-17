import React from 'react';
import { useUser } from '@core/infrastructure/hooks/useUser';
import Background from '@core/presentation/shared/Background';
import Button from '@core/presentation/shared/Button';
import {
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const ConclusionCreateUser: React.FC = () => {
  const { createUser } = useUser();

  return (
    <Background>
      <StyledScroll>
        <StyledTitle>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </StyledTitle>

        <StyledSubtitle>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters
        </StyledSubtitle>

        <StyledWrapperButtonSubmit>
          <Button title="Começar" onPress={createUser} />
        </StyledWrapperButtonSubmit>
      </StyledScroll>
    </Background>
  );
};

export default ConclusionCreateUser;
