import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, Label } from './styles';

interface LoaderProps {
  visible: boolean;
}

export const Loader = ({ visible }: LoaderProps) => {
  const { fonts } = useTheme();

  return (
    <Modal visible={visible} transparent>
      <Container>
        <ActivityIndicator size="large" color={fonts.color.primary} />
        <Label>Carregando...</Label>
      </Container>
    </Modal>
  );
};
