import React from 'react';
import { useTheme } from 'styled-components/native';
import { StyledContainerSearchBar, StyledTextInputSearchBar } from './styles';
import { TextInputProps, ViewStyle } from 'react-native';
import Icon from '@/core/presentation/shared/Icon';

interface ISearchbar extends TextInputProps {
  wrapperStyle?: ViewStyle;
}

const SearchBar: React.FC<ISearchbar> = ({ wrapperStyle = {}, ...rest }) => {
  const { colors } = useTheme();

  return (
    <StyledContainerSearchBar style={wrapperStyle}>
      <Icon name="search" color={colors.white} size={24} />
      <StyledTextInputSearchBar
        placeholder="Buscar..."
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </StyledContainerSearchBar>
  );
};

export default SearchBar;
