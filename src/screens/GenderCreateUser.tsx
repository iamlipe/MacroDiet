import React from 'react';
import { useGenderStore } from '@stores/gender';
import { useCreateUser } from '@hooks/index';
import { Formik } from 'formik';
import {
  Background,
  Button,
  Container,
  Option,
  Scroll,
} from '@components/index';
import { buildOptions } from '@components/Option';
import * as Yup from 'yup';

export const GenderCreateUser = () => {
  const { gender } = useGenderStore();
  const { handleForm } = useCreateUser();

  const initialValuesGender = {
    genderId: 'Por favor, selecione o seu sexo biológico',
  };

  const genderSchema = Yup.object().shape({
    genderId: Yup.string().required(),
  });

  return (
    <Background>
      <Formik
        initialValues={initialValuesGender}
        validationSchema={genderSchema}
        onSubmit={values =>
          handleForm({ values, navigateTo: 'HeightCreateUser' })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <Option
              name="goalId"
              label="sexo"
              value={values.genderId}
              options={gender?.map(buildOptions) || []}
              onChange={handleChange('genderId')}
              error={touched.genderId && errors.genderId ? errors.genderId : ''}
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
