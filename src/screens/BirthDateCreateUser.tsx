import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { DatePicker } from '@components/DatePicker';
import { Label } from '@components/Label';
import { Scroll } from '@components/Scroll';
import { useCreateUser } from '@hooks/useCreateUser';
import { Formik } from 'formik';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const BirthDateCreateUser = () => {
  const {
    handleForm,
    handleValuesForm,
    birthDateSchema,
    initialValuesBirthDate,
  } = useCreateUser();
  const { fonts, effects } = useTheme();

  return (
    <Background>
      <Scroll>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.md}
        />

        <Formik
          initialValues={initialValuesBirthDate}
          validationSchema={birthDateSchema}
          onSubmit={values => {
            handleForm({
              values: handleValuesForm(values),
              navigateTo: 'GenderCreateUser',
            });
          }}>
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <>
              <DatePicker
                name="birthDate"
                label="Qual a sua data de nascimento?"
                value={values.birthDate}
                placeholder="Selecione uma data"
                onChange={handleChange('birthDate')}
                error={
                  touched.birthDate && errors.birthDate ? errors.birthDate : ''
                }
              />

              <Container flex={1} justifyContent="flex-end">
                <Button
                  title="Proximo"
                  icon={{ name: 'long-arrow-right' }}
                  onPress={handleSubmit}
                />
              </Container>
            </>
          )}
        </Formik>
      </Scroll>
    </Background>
  );
};
