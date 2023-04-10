import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

import { StyledContainerLoader, StyledLabel } from './styles';

interface ILoader {
  visible: boolean;
}

const Loader: React.FC<ILoader> = ({ visible }) => {
  const { fonts } = useTheme();

  return (
    <Modal visible={visible} transparent>
      <StyledContainerLoader>
        <ActivityIndicator size="large" color={fonts.color.primary} />
        <StyledLabel>Carregando...</StyledLabel>
      </StyledContainerLoader>
    </Modal>
  );
};

export default Loader;
