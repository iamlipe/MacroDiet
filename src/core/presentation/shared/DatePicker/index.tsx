import React, { useMemo, useRef } from 'react';
import moment from 'moment';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '@/core/presentation/shared/BottomSheet';
import {
  StyledTitle,
  StyledError,
  StyledLabel,
  StyledDatePicker,
  StyledContainerDatePicker,
} from './styles';
import { View, ViewStyle } from 'react-native';

interface IDatePicker {
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  mode?: 'date' | 'time';
  error?: string;
  wrapperStyle?: ViewStyle;
}

const DatePicker: React.FC<IDatePicker> = ({
  label,
  mode = 'date',
  placeholder = 'Selecione',
  onChange,
  value,
  error,
  wrapperStyle = {},
  ...rest
}) => {
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
        ? moment(date).format('DD/MM/YYYY')
        : moment(date).format('HH:mm'),
    [date, mode],
  );

  return (
    <View style={[wrapperStyle]}>
      {label && <StyledLabel>{firstLetterUppercase(label)}</StyledLabel>}

      <StyledContainerDatePicker
        activeOpacity={1}
        onPress={() => bottomSheetRef.current?.present()}
        {...rest}>
        <StyledTitle selected={selected}>
          {selected ? currentDate : placeholder}
        </StyledTitle>

        {error && <StyledError>{error}</StyledError>}
      </StyledContainerDatePicker>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['40%']}
        close={() => bottomSheetRef.current?.close()}>
        <StyledDatePicker
          value={date}
          mode={mode}
          maximumDate={mode === 'date' ? new Date() : undefined}
          onChange={res => {
            onChange(moment(res.nativeEvent.timestamp).format());
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default DatePicker;
