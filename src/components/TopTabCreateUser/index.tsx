import React from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { NavPropsCreateUser } from '@routes/createUserStack';
import { useTheme } from 'styled-components/native';
import { ProgressBar } from '../ProgressBar';
import { Icon } from '@components/Icon';
import { SafeAreaView } from 'react-native';
import { Logo } from '../Logo';
import {
  StyledContainer,
  StyledBaseButton,
  StyledWrapperProgressbar,
} from './styles';

export const TopTabCreateUser = ({ state }: MaterialTopTabBarProps) => {
  const { colors, fonts, effects } = useTheme();
  const { goBack } = useNavigation<NavPropsCreateUser>();

  return (
    <SafeAreaView>
      <StyledContainer>
        <StyledBaseButton onPress={goBack}>
          {!!state.index && (
            <Icon
              name="arrow-left"
              size={fonts.size.s2}
              color={colors.gray[400]}
            />
          )}
        </StyledBaseButton>

        <StyledWrapperProgressbar>
          <Logo marginBottom={effects.spacing.md} />

          <ProgressBar percentage={0.2} />
        </StyledWrapperProgressbar>

        <StyledBaseButton disabled activeOpacity={0} />
      </StyledContainer>
    </SafeAreaView>
  );
};
