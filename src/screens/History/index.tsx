import React from 'react';
import { StyledScroll } from './styles';
import { Header, Background } from '@components/index';
import { useNavigation } from '@react-navigation/native';

const History = () => {
  const { goBack } = useNavigation();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Historico"
      />

      <StyledScroll />
    </Background>
  );
};

export default History;
