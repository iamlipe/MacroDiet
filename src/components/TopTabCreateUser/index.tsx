import { Icon } from '@components/Icon';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { NavPropsCreateUser } from '@routes/createUserStack';
import React from 'react';
import { useTheme } from 'styled-components/native';

import {
  Wrapper,
  Container,
  Progressbar,
  ContainerProgressbar,
  BaseButton,
} from './styles';

export const TopTabCreateUser = ({ state }: MaterialTopTabBarProps) => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation<NavPropsCreateUser>();

  return (
    <Wrapper>
      <Container>
        <BaseButton onPress={goBack}>
          {!!state.index && (
            <Icon
              name="arrow-left"
              size={fonts.size.s2}
              color={colors.gray[400]}
            />
          )}
        </BaseButton>

        <ContainerProgressbar>
          <Progressbar
            progress={((state.index + 1) * 100) / state.routes.length}
          />
        </ContainerProgressbar>

        <BaseButton disabled activeOpacity={1} />
      </Container>
    </Wrapper>
  );
};
