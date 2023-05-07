import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  StyledWrapper,
  StyledSwitchCircle,
  StyledSwitchContainer,
  StyledLabel,
} from './styles';

interface IToggle {
  title?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  wrapperStyle?: ViewStyle;
}

const Toggle = ({ title, value, onChange, wrapperStyle = {} }: IToggle) => {
  const switchValue = useSharedValue(value ? 1 : 0);
  const { colors } = useTheme();

  const toggleSwitch = () => {
    onChange(switchValue.value === 0);
    switchValue.value = withTiming(switchValue.value === 0 ? 1 : 0);
  };

  const switchTranslateX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(switchValue.value ? 30 : 4, {
            duration: 100,
            easing: Easing.ease,
          }),
        },
      ],
    };
  });

  const switchBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        switchValue.value ? colors.primary[200] : colors.gray[200],
        {
          duration: 100,
          easing: Easing.ease,
        },
      ),
    };
  });

  const switchCircleBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        switchValue.value ? colors.primary[500] : colors.gray[600],
        {
          duration: 100,
          easing: Easing.ease,
        },
      ),
    };
  });

  return (
    <StyledWrapper style={wrapperStyle}>
      {title ? <StyledLabel>{title}</StyledLabel> : null}

      <TouchableOpacity activeOpacity={1} onPress={toggleSwitch}>
        <StyledSwitchContainer style={switchBackgroundColor}>
          <StyledSwitchCircle
            style={[switchCircleBackgroundColor, switchTranslateX]}
          />
        </StyledSwitchContainer>
      </TouchableOpacity>
    </StyledWrapper>
  );
};

export default Toggle;
