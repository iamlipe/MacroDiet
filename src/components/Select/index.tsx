import { Card } from '@components/Card';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { firstLetterUppercase } from '@utils/stringFormat';
import React, { useMemo, useRef } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

import {
  Wrapper,
  Label,
  Container,
  Selected,
  BottomSheet,
  BottomSheetScroll,
  Backdrop,
  Error,
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
    return <Backdrop onPress={() => bottomSheetRef.current?.close()} />;
  };

  return (
    <Wrapper flex={flex} name={name} {...rest}>
      {label && <Label>{firstLetterUppercase(label)}</Label>}

      <Container
        onPress={() => bottomSheetRef.current?.present()}
        style={contentStyle}>
        <Selected style={inputStyle}>
          {selected ? firstLetterUppercase(selected) : placeholder}
        </Selected>

        {error && <Error>{error}</Error>}
      </Container>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['35%']}
        backdropComponent={renderBackDrop}>
        <BottomSheetScroll>
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
        </BottomSheetScroll>
      </BottomSheet>
    </Wrapper>
  );
};
