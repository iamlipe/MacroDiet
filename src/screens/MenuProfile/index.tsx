import React from 'react';
import { NavPropsLogged } from '@routes/logged';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@stores/index';
import { useMenu } from '@hooks/index';
import { Background, Header } from '@components/index';
import {
  StyledScroll,
  StyledCardOption,
  StyledPhotoUser,
  StyledCircle,
  StyledInitialLetterUser,
} from './styles';

const MenuProfile = () => {
  const { menuOptions } = useMenu();
  const { user } = useUserStore();
  const { navigate: navigateProfile } = useNavigation<NavPropsLogged>();

  return (
    <Background>
      <Header title="menu" />

      <StyledScroll>
        {!user.photo ? (
          <StyledPhotoUser source={{ uri: user.photo }} />
        ) : (
          <StyledCircle>
            <StyledInitialLetterUser>{user.name[0]}</StyledInitialLetterUser>
          </StyledCircle>
        )}

        {menuOptions.map(option => (
          <StyledCardOption
            key={option.key}
            title={option.name}
            icon={{ name: 'right' }}
            onPress={() => navigateProfile(option.navigateTo)}
          />
        ))}
      </StyledScroll>
    </Background>
  );
};

export default MenuProfile;
