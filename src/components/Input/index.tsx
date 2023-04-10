import React, { forwardRef, useState } from 'react';
import { firstLetterUppercase } from '@utils/stringFormat';
import { useTheme } from 'styled-components/native';
import Icon from '@components/Icon';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  StyledContainerInput,
  StyledLabel,
  StyledTextInput,
  StyledError,
  StyledColumn,
} from './styles';

interface IInput extends TextInputProps {
  name: string;
  value: string;
  error?: string;
  label?: string;
  secureTextEntry?: boolean;
  wrapperStyle?: ViewStyle;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
}

const Input = forwardRef<TextInput, IInput>(
  (
    {
      value,
      error,
      label,
      secureTextEntry,
      wrapperStyle = {},
      inputStyle = {},
      ...rest
    },
    ref,
  ) => {
    const [securityText, setSecurityText] = useState(secureTextEntry);
    const { colors, fonts } = useTheme();

    return (
      <View style={wrapperStyle}>
        {label && (
          <StyledLabel numberOfLines={1}>
            {firstLetterUppercase(label)}
          </StyledLabel>
        )}

        <StyledContainerInput>
          <StyledColumn>
            <StyledTextInput
              ref={ref}
              value={value}
              secureTextEntry={!!securityText}
              {...rest}
              style={inputStyle}
            />

            {error && <StyledError>{error}</StyledError>}
          </StyledColumn>

          {secureTextEntry && (
            <TouchableOpacity onPress={() => setSecurityText(!securityText)}>
              <Icon
                name={securityText ? 'eye' : 'eye-slash'}
                size={fonts.size.s2}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
        </StyledContainerInput>
      </View>
    );
  },
);

export default Input;
