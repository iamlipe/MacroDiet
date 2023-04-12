import React from 'react';
import { Background, Header, Button } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { useUserStore } from '@stores/index';
import {
  StyledDescription,
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledLabel,
  StyledInfo,
} from './styles';

const UserInfo = () => {
  const { goBack, navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Informações"
      />

      <StyledScroll>
        <StyledDescription>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </StyledDescription>

        <StyledLabel>Nome</StyledLabel>
        <StyledInfo>{`${user.name} ${user.lastName}`}</StyledInfo>

        <StyledLabel>Email</StyledLabel>
        <StyledInfo>{user.email}</StyledInfo>

        <StyledWrapperButtonSubmit>
          <Button
            title="Editar"
            onPress={() => navigateLogged('EditUserInfo')}
          />
        </StyledWrapperButtonSubmit>
      </StyledScroll>
    </Background>
  );
};

export default UserInfo;
