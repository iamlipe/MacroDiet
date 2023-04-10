import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Background, Header } from '@components/index';
import { StyledScroll } from './styles';

const Notifications = () => {
  const { goBack } = useNavigation();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Notificacoes"
      />

      <StyledScroll />
    </Background>
  );
};

export default Notifications;
