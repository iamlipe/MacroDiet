import { Icon } from '@components/Icon';
import React from 'react';
import { useTheme } from 'styled-components/native';

import { Container, TextInput } from './styles';

interface SearchBarProps {
  onChangeText: (text: string) => void;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChangeText,
  ...rest
}) => {
  const { colors, fonts } = useTheme();

  return (
    <Container {...rest}>
      <Icon name="search" color={colors.gray.white} size={fonts.size.s1} />
      <TextInput placeholder="Buscar..." onChangeText={onChangeText} />
    </Container>
  );
};
