import { Icon } from '@components/Icon';
import { firstLetterUppercase } from '@utils/stringFormat';
import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  StyledContainerInput,
  StyledLabel,
  StyledTextInput,
  StyledError,
  StyledColumn,
} from './styles';

interface InputProps {
  name: string;
  value: string;
  error?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  label?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  inputStyle?: TextStyle;
  placeholder?: string;
  flex?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const Input: React.FC<InputProps> = ({
  name,
  value,
  onBlur,
  onChangeText,
  error,
  inputStyle,
  label,
  secureTextEntry,
  placeholder,
  ...rest
}) => {
  const [securityText, setSecurityText] = useState(secureTextEntry);
  const { colors, fonts } = useTheme();

  return (
    <>
      {label && <StyledLabel>{firstLetterUppercase(label)}</StyledLabel>}

      <StyledContainerInput {...rest}>
        <StyledColumn>
          <StyledTextInput
            name={name}
            value={value}
            placeholder={placeholder}
            secureTextEntry={!!securityText}
            onBlur={onBlur}
            onChangeText={onChangeText}
            style={inputStyle}
          />

          {error && <StyledError>{error}</StyledError>}
        </StyledColumn>

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setSecurityText(!securityText)}>
            <Icon
              name={securityText ? 'eye' : 'eye-slash'}
              size={fonts.size.s2}
              color={colors.gray.white}
            />
          </TouchableOpacity>
        )}
      </StyledContainerInput>
    </>
  );
};
