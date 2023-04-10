import React from 'react';
import { firstLetterUppercase } from '@utils/stringFormat';
import { useTheme } from 'styled-components/native';
import { StyledContainerHeader, StyledTitle, StyledBaseButton } from './styles';
import Icon from '@components/Icon';

interface IHeader {
  title?: string;
  hasLogo?: boolean;
  left?: { iconName?: string; press: () => void };
  right?: { iconName?: string; press: () => void };
}

const Header: React.FC<IHeader> = ({ title, left, right, hasLogo = false }) => {
  const { colors, fonts } = useTheme();

  return (
    <StyledContainerHeader>
      <StyledBaseButton show={!!left} onPress={left?.press}>
        <Icon
          name={left?.iconName || 'arrow-left'}
          color={colors.white}
          size={fonts.size.s2}
        />
      </StyledBaseButton>

      {hasLogo ? (
        <Icon name="logo" color={colors.primary[500]} size={32} />
      ) : (
        <StyledTitle>{firstLetterUppercase(title)}</StyledTitle>
      )}

      <StyledBaseButton show={!!right} onPress={right?.press}>
        <Icon
          name={right?.iconName || 'arrow-right'}
          color={colors.white}
          size={fonts.size.s2}
        />
      </StyledBaseButton>
    </StyledContainerHeader>
  );
};

export default Header;
