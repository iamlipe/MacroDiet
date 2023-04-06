import React from 'react';
import { useCreateUser } from '@hooks/useCreateUser';
import { useActivityStore } from '@stores/acitivity';
import { Formik } from 'formik';
import {
  Background,
  Button,
  Container,
  Option,
  Scroll,
} from '@components/index';
import * as Yup from 'yup';
import { buildOptionForm } from '@utils/help';

export const ActivityCreateUser = () => {
  const { handleForm } = useCreateUser();
  const { acitivities } = useActivityStore();

  const initialValuesActivity = {
    activityDoc: '',
  };

  const activitySchema = Yup.object().shape({
    activityDoc: Yup.string().required(
      'Por favor, selecione um nível de atividade.',
    ),
  });

  return (
    <Background>
      <Formik
        initialValues={initialValuesActivity}
        validationSchema={activitySchema}
        onSubmit={values =>
          handleForm({ values, navigateTo: 'BirthDateCreateUser' })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <Option
              name="activityDoc"
              label="Defina seu nível de atividade física diária"
              value={values.activityDoc}
              options={acitivities?.map(buildOptionForm) || []}
              onChange={handleChange('activityDoc')}
              error={
                touched.activityDoc && errors.activityDoc
                  ? errors.activityDoc
                  : ''
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
