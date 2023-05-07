import React, { forwardRef, useState } from 'react';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { useTheme } from 'styled-components/native';
import Icon from '@/core/presentation/shared/Icon';
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
    const { colors } = useTheme();

    return (
      <View style={[wrapperStyle]}>
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
              placeholderTextColor={colors.gray[400]}
              {...rest}
              style={inputStyle}
            />
          </StyledColumn>

          {secureTextEntry && (
            <TouchableOpacity onPress={() => setSecurityText(!securityText)}>
              <Icon
                name={securityText ? 'eye' : 'eye-off'}
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
        </StyledContainerInput>

        {error && <StyledError>{error}</StyledError>}
      </View>
    );
  },
);

export default Input;
