import { firstLetterUppercase } from '@utils/stringFormat';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import DatePickerModal from 'react-native-date-picker';
import { Wrapper, Title, Error, Label } from './styles';

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
  const [open, setOpen] = useState(false);
  const date = useMemo(() => (value ? new Date(value) : new Date()), [value]);
  const selected = useMemo(
    () => (mode === 'date' ? moment(date).isBefore(new Date(), 'day') : true),
    [date, mode],
  );
  const currentDate = useMemo(
    () =>
      mode === 'date'
        ? moment(date).format('MMM DD YYYY')
        : moment(date).format('HH:mm'),
    [date, mode],
  );

  return (
    <>
      {label && <Label>{firstLetterUppercase(label)}</Label>}

      <Wrapper name={name} onPress={() => setOpen(true)} {...rest}>
        <Title selected={selected}>
          {selected ? currentDate : placeholder}
        </Title>
      </Wrapper>

      {error && <Error>{error}</Error>}

      <DatePickerModal
        modal
        mode={mode}
        open={open}
        date={date}
        maximumDate={mode === 'date' ? new Date() : undefined}
        onConfirm={res => {
          onChange(moment(res).format());
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
