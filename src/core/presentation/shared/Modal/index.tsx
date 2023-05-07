import React, { ReactNode } from 'react';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { useTheme } from 'styled-components/native';
import { Modal as ModalRN, TouchableOpacity } from 'react-native';
import Icon from '@/core/presentation/shared/Icon';
import {
  StyledContent,
  StyledModalContainer,
  StyledModalContent,
  StyledModalHeader,
  StyledModalTitle,
} from './styles';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children }) => {
  const { colors } = useTheme();

  return (
    <ModalRN visible={visible} transparent={true} animationType="fade">
      <StyledModalContainer>
        <StyledModalContent>
          <StyledModalHeader>
            <StyledModalTitle>{firstLetterUppercase(title)}</StyledModalTitle>

            <TouchableOpacity onPress={onClose}>
              <Icon name="x" size={20} color={colors.gray[400]} />
            </TouchableOpacity>
          </StyledModalHeader>

          <StyledContent>{children}</StyledContent>
        </StyledModalContent>
      </StyledModalContainer>
    </ModalRN>
  );
};

export default Modal;
