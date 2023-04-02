import { buildOptions } from '@components/Option';
import React from 'react';
import { useCreateUser } from '@hooks/useCreateUser';
import { useGoalStore } from '@stores/goal';
import { Formik } from 'formik';
import {
  Background,
  Button,
  Container,
  Option,
  Scroll,
} from '@components/index';

export const GoalCreateUser = () => {
  const { goals } = useGoalStore();
  const { initialValuesGoal, goalSchema, handleForm } = useCreateUser();

  return (
    <Background>
      <Formik
        initialValues={initialValuesGoal}
        validationSchema={goalSchema}
        onSubmit={values =>
          handleForm({ values, navigateTo: 'ActivityCreateUser' })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <Option
              name="goalId"
              label="Escolha seu objetivo"
              value={values.goalId}
              options={goals?.map(buildOptions) || []}
              onChange={handleChange('goalId')}
              error={touched.goalId && errors.goalId ? errors.goalId : ''}
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
