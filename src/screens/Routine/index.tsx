import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Background, Header } from '@components/index';
import { StyledScroll } from './styles';

const Routine = () => {
  const { goBack } = useNavigation();

  return (
    <Background>
      <Header left={{ iconName: 'arrow-left', press: goBack }} title="Rotina" />

      <StyledScroll />
    </Background>
  );
};

export default Routine;
