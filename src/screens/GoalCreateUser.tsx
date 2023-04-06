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
import * as Yup from 'yup';
import { buildOptionForm } from '@utils/help';

export const GoalCreateUser = () => {
  const { goals } = useGoalStore();
  const { handleForm } = useCreateUser();

  const initialValuesGoal = {
    goalDoc: '',
  };

  const goalSchema = Yup.object().shape({
    goalDoc: Yup.string().required('Por favor, selecione o seu objetivo.'),
  });

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
              name="goalDoc"
              label="Escolha seu objetivo"
              value={values.goalDoc}
              options={goals?.map(buildOptionForm) || []}
              onChange={handleChange('goalDoc')}
              error={touched.goalDoc && errors.goalDoc ? errors.goalDoc : ''}
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
