import React, { useEffect, useMemo, useRef } from 'react';
import { Card } from '@components/Card';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { firstLetterUppercase } from '@utils/stringFormat';
import { TextStyle, ViewStyle } from 'react-native';

import {
  StyledWrapper,
  StyledLabel,
  StyledContainer,
  StyledSelected,
  StyledBottomSheet,
  StyledBottomSheetScroll,
  StyledBackdrop,
  StyledError,
} from './styles';

export interface Option {
  key: string;
  name: string;
}

interface SelectProps {
  name: string;
  label?: string;
  value: string;
  options: Option[];
  placeholder?: string;
  error?: string;
  onChange: (text: string) => void;
  contentStyle?: ViewStyle;
  inputStyle?: TextStyle;
  flex?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  placeholder = 'Selecione',
  contentStyle = {},
  inputStyle = {},
  error,
  flex = 1,
  ...rest
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const selected = useMemo(
    () => options.filter(option => option.key === value)[0]?.name,
    [options, value],
  );

  const renderBackDrop = () => {
    return <StyledBackdrop onPress={() => bottomSheetRef.current?.close()} />;
  };

  useEffect(() => {
    onChange(options[0].key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledWrapper flex={flex} name={name} {...rest}>
      {label && <StyledLabel>{firstLetterUppercase(label)}</StyledLabel>}

      <StyledContainer
        onPress={() => bottomSheetRef.current?.present()}
        style={contentStyle}>
        <StyledSelected style={inputStyle}>
          {selected ? firstLetterUppercase(selected) : placeholder}
        </StyledSelected>

        {error && <StyledError>{error}</StyledError>}
      </StyledContainer>

      <StyledBottomSheet
        ref={bottomSheetRef}
        snapPoints={['35%']}
        backdropComponent={renderBackDrop}>
        <StyledBottomSheetScroll>
          {options.map(option => (
            <Card
              key={option.key}
              type="none"
              title={option.name}
              onPress={() => {
                bottomSheetRef.current?.close();
                onChange(option.key);
              }}
            />
          ))}
        </StyledBottomSheetScroll>
      </StyledBottomSheet>
    </StyledWrapper>
  );
};
