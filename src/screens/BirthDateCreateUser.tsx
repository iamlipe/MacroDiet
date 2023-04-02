import React from 'react';
import { useCreateUser } from '@hooks/useCreateUser';
import { Formik } from 'formik';
import {
  Background,
  Button,
  Container,
  DatePicker,
  Scroll,
} from '@components/index';

export const BirthDateCreateUser = () => {
  const {
    handleForm,
    handleValuesForm,
    birthDateSchema,
    initialValuesBirthDate,
  } = useCreateUser();

  return (
    <Background>
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
          <Scroll>
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
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
