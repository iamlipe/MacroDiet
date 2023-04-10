import React from 'react';
import * as Yup from 'yup';
import { useCreateUser } from '@hooks/index';
import { Formik } from 'formik';
import { Background, Button, DatePicker } from '@components/index';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';

const BirthDateCreateUser = () => {
  const { handleForm, handleValuesForm } = useCreateUser();

  const initialValuesBirthDate = {
    birthDate: '',
  };

  const birthDateSchema = Yup.object().shape({
    birthDate: Yup.date()
      .max(
        new Date(),
        'A data selecionada deve estar no passado em relação ao dia atual.',
      )
      .required('Por favor, selecione a sua data de nascimento.'),
  });

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
          <StyledScroll>
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

            <StyledWrapperButtonSubmit>
              <Button
                title="Proximo"
                icon={{ name: 'long-arrow-right' }}
                onPress={handleSubmit}
              />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default BirthDateCreateUser;
