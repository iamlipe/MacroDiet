import React from 'react';
import { buildOptions } from '@components/Option';
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

export const ActivityCreateUser = () => {
  const { activitySchema, handleForm, initialValuesActivity } = useCreateUser();
  const { acitivities } = useActivityStore();

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
              name="activityId"
              label="Defina seu nível de atividade física diária"
              value={values.activityId}
              options={acitivities?.map(buildOptions) || []}
              onChange={handleChange('activityId')}
              error={
                touched.activityId && errors.activityId ? errors.activityId : ''
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
