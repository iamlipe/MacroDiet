import React, { useMemo, useRef } from 'react';
import { firstLetterUppercase } from '@utils/stringFormat';
import moment from 'moment';
import {
  StyledWrapper,
  StyledTitle,
  StyledError,
  StyledLabel,
  StyledBottomSheet,
  StyledDatePicker,
} from './styles';
import { Backdrop } from '@components/Select/styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from '@components/Container';

interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  mode?: 'date' | 'time';
  error?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const DatePicker = ({
  name,
  label,
  mode = 'date',
  placeholder = 'Selecione uma data',
  onChange,
  value,
  error,
  ...rest
}: DatePickerProps) => {
  const { effects } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const date = useMemo(
    () => (value.length ? new Date(value) : new Date()),
    [value],
  );

  const selected = useMemo(
    () =>
      mode === 'date'
        ? moment(date).isBefore(new Date(), 'day')
        : !moment(date).isSame(new Date(), 'minute'),
    [date, mode],
  );

  const currentDate = useMemo(
    () =>
      mode === 'date'
        ? moment(date).format('MMM DD YYYY')
        : moment(date).format('HH:mm'),
    [date, mode],
  );

  const renderBackDrop = () => {
    return <Backdrop onPress={() => bottomSheetRef.current?.close()} />;
  };

  return (
    <>
      {label && <StyledLabel>{firstLetterUppercase(label)}</StyledLabel>}

      <StyledWrapper
        name={name}
        onPress={() => bottomSheetRef.current?.present()}
        {...rest}>
        <StyledTitle selected={selected}>
          {selected ? currentDate : placeholder}
        </StyledTitle>

        {error && <StyledError>{error}</StyledError>}
      </StyledWrapper>

      <StyledBottomSheet
        ref={bottomSheetRef}
        snapPoints={['40%']}
        backdropComponent={renderBackDrop}>
        <Container
          flex={1}
          backgroundColor={'black'}
          paddingBottom={bottom + effects.spacing.sm}
          paddingTop={effects.spacing.sm}
          paddingHorizontal={effects.spacing.md}>
          <StyledDatePicker
            value={date}
            mode={mode}
            maximumDate={mode === 'date' ? new Date() : undefined}
            onChange={res => {
              onChange(moment(res.nativeEvent.timestamp).format());
            }}
          />
        </Container>
      </StyledBottomSheet>
    </>
  );
};
