import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import Button from '@/core/presentation/shared/Button';
import {
  StyledDescription,
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledLabel,
  StyledInfo,
} from './styles';

const UserInfoView: React.FC = () => {
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();

  return (
    <StyledScroll>
      <StyledDescription>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDescription>

      <StyledLabel>Nome</StyledLabel>
      <StyledInfo>{`${user?.firstName} ${user?.lastName}`}</StyledInfo>

      <StyledLabel>Email</StyledLabel>
      <StyledInfo>{user?.email}</StyledInfo>

      <StyledWrapperButtonSubmit>
        <Button title="Editar" onPress={() => navigateLogged('EditUserInfo')} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default UserInfoView;
