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
  Wrapper,
  ContainerInput,
  Label,
  TextInput,
  Error,
  Column,
} from './styles';

interface InputProps {
  name: string;
  value: string;
  error?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  label?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  flex?: number;
  inputStyle?: TextStyle;
  placeholder?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const buildSelect = (raw: { id: string; title: string }) => {
  return {
    key: raw.id,
    name: raw.title,
  };
};

export const Input: React.FC<InputProps> = ({
  flex = 1,
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
      <Wrapper flex={flex} {...rest}>
        {label && <Label>{firstLetterUppercase(label)}</Label>}

        <ContainerInput>
          <Column>
            <TextInput
              name={name}
              value={value}
              placeholder={placeholder}
              secureTextEntry={!!securityText}
              onBlur={onBlur}
              onChangeText={onChangeText}
              style={inputStyle}
            />

            {error && <Error>{error}</Error>}
          </Column>

          {secureTextEntry && (
            <TouchableOpacity onPress={() => setSecurityText(!securityText)}>
              <Icon
                name={securityText ? 'eye' : 'eye-slash'}
                size={fonts.size.s2}
                color={colors.gray.white}
              />
            </TouchableOpacity>
          )}
        </ContainerInput>
      </Wrapper>
    </>
  );
};
