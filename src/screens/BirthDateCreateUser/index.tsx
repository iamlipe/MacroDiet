import React from 'react';
import * as Yup from 'yup';
import { useUser } from '@hooks/index';
import { Formik } from 'formik';
import { Background, Button, DatePicker } from '@components/index';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';
import { formatDate } from '@utils/format';

const BirthDateCreateUser = () => {
  const { handleFormCreateUser } = useUser();

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
          handleFormCreateUser({
            values: { birthDate: formatDate(values.birthDate) },
            navigateTo: 'ActivityCreateUser',
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
              <Button title="Proximo" onPress={handleSubmit} />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default BirthDateCreateUser;
