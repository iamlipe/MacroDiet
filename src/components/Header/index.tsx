import { Icon } from '@components/Icon';
import { firstLetterUppercase } from '@utils/stringFormat';
import React from 'react';
import { useTheme } from 'styled-components/native';

import { Wrapper, BaseButton, Title } from './styles';

interface HeaderProps {
  title: string;
  left?: { iconName?: string; press: () => void };
  right?: { iconName?: string; press: () => void };
}

export const Header: React.FC<HeaderProps> = ({ title, left, right }) => {
  const { colors, fonts } = useTheme();

  return (
    <Wrapper>
      <BaseButton show={!!left} onPress={left?.press}>
        <Icon
          name={left?.iconName || 'arrow-left'}
          color={colors.gray.white}
          size={fonts.size.s2}
        />
      </BaseButton>

      <Title>{firstLetterUppercase(title)}</Title>

      <BaseButton show={!!right} onPress={right?.press}>
        <Icon
          name={right?.iconName || 'arrow-right'}
          color={colors.gray.white}
          size={fonts.size.s2}
        />
      </BaseButton>
    </Wrapper>
  );
};
