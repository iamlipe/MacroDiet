import React from 'react';
import { useTheme } from 'styled-components/native';
import { StyledContainerSearchBar, StyledTextInputSearchBar } from './styles';
import { TextInputProps, ViewStyle } from 'react-native';
import Icon from '@components/Icon';

interface ISearchbar extends TextInputProps {
  wrapperStyle?: ViewStyle;
}

const SearchBar: React.FC<ISearchbar> = ({ wrapperStyle = {}, ...rest }) => {
  const { colors, fonts } = useTheme();

  return (
    <StyledContainerSearchBar style={wrapperStyle}>
      <Icon name="search" color={colors.white} size={fonts.size.s1} />
      <StyledTextInputSearchBar placeholder="Buscar..." {...rest} />
    </StyledContainerSearchBar>
  );
};

export default SearchBar;
