import React from 'react';
import { firstLetterUppercase } from '@utils/stringFormat';
import { useTheme } from 'styled-components/native';
import { Wrapper, BaseButton, Title } from './styles';
import { Icon } from '@components/Icon';

interface HeaderProps {
  title?: string;
  hasLogo?: boolean;
  left?: { iconName?: string; press: () => void };
  right?: { iconName?: string; press: () => void };
}

export const Header: React.FC<HeaderProps> = ({
  title,
  left,
  right,
  hasLogo = false,
}) => {
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

      {hasLogo ? (
        <Icon name="logo" color={colors.primary[500]} size={32} />
      ) : (
        <Title>{firstLetterUppercase(title)}</Title>
      )}

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
