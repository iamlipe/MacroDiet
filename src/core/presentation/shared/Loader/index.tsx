import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { StyledContainerLoader, StyledLabel } from './styles';

interface ILoader {
  visible: boolean;
}

const Loader: React.FC<ILoader> = ({ visible }) => {
  return (
    <Modal visible={visible} transparent>
      <StyledContainerLoader>
        <ActivityIndicator size="large" color="white" />
        <StyledLabel>Carregando...</StyledLabel>
      </StyledContainerLoader>
    </Modal>
  );
};

export default Loader;
