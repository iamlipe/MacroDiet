import React from 'react';
import { StyledRoundedButton } from './styles';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@components/Icon';

interface IRoundedButton {
  onPress: () => void;
  icon: { name: string; color?: string; size?: number };
}

const RoundedButton: React.FC<IRoundedButton> = ({ icon, onPress }) => {
  const { colors, fonts } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <StyledRoundedButton insets={insets} onPress={onPress}>
      <Icon
        name={icon.name}
        size={icon.size || fonts.size.s2}
        color={icon.color || colors.white}
      />
    </StyledRoundedButton>
  );
};

export default RoundedButton;
