import React from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { NavPropsCreateUser } from '@routes/createUserStack';
import { useTheme } from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import ProgressBar from '@components/ProgressBar';
import Icon from '@components/Icon';
import {
  StyledContainer,
  StyledBaseButton,
  StyledWrapperProgressbar,
  StyledLogo,
} from './styles';

const TopTabCreateUser: React.FC<MaterialTopTabBarProps> = ({ state }) => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation<NavPropsCreateUser>();

  return (
    <SafeAreaView>
      <StyledContainer>
        <StyledBaseButton onPress={goBack}>
          {!!state.index && (
            <Icon name="arrow-left" size={fonts.size.s2} color={colors.white} />
          )}
        </StyledBaseButton>

        <StyledWrapperProgressbar>
          <StyledLogo
            name="logo"
            color={colors.primary[500]}
            size={fonts.size.tl}
          />

          <ProgressBar percentage={(state.index + 1) / state.routes.length} />
        </StyledWrapperProgressbar>

        <StyledBaseButton disabled activeOpacity={0} />
      </StyledContainer>
    </SafeAreaView>
  );
};

export default TopTabCreateUser;
