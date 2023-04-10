import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Background, Header } from '@components/index';
import { StyledScroll } from './styles';

const Help = () => {
  const { goBack } = useNavigation();

  return (
    <Background>
      <Header left={{ iconName: 'arrow-left', press: goBack }} title="Ajuda" />

      <StyledScroll />
    </Background>
  );
};

export default Help;
