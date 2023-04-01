import React from 'react';
import { Background } from '@components/Backgroud';
import { Container } from '@components/Container';
import { DatePicker } from '@components/DatePicker';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Scroll } from '@components/Scroll';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

export const AddMeal = () => {
  const { bottom } = useSafeAreaInsets();
  const { effects } = useTheme();

  return (
    <Background>
      <Header title="Adicionar refeição" />

      <Formik
        initialValues={{ mealTime: '', title: '' }}
        onSubmit={values => console.log(values)}>
        {({ handleChange, values, errors, touched }) => (
          <>
            <Scroll style={{ marginBottom: 160 + bottom }}>
              <Container>
                <Input
                  label="Nome"
                  name="title"
                  value={values.title}
                  marginBottom={effects.spacing.lg}
                />

                <DatePicker
                  name="mealTime"
                  label="Horario da refeição"
                  mode="time"
                  onChange={handleChange('mealTime')}
                  value={values.mealTime}
                  marginBottom={effects.spacing.hg}
                  error={
                    touched.mealTime && errors.mealTime ? errors.mealTime : ''
                  }
                />
              </Container>
            </Scroll>
          </>
        )}
      </Formik>
    </Background>
  );
};
