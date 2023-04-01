import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Label } from '@components/Label';
import { buildOptions, Option } from '@components/Option';
import { Scroll } from '@components/Scroll';
import { useCreateUser } from '@hooks/useCreateUser';
import { useGoalStore } from '@stores/goal';
import { Formik } from 'formik';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const GoalCreateUser = () => {
  const { goals } = useGoalStore();
  const { initialValuesGoal, goalSchema, handleForm } = useCreateUser();
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
          initialValues={initialValuesGoal}
          validationSchema={goalSchema}
          onSubmit={values =>
            handleForm({ values, navigateTo: 'ActivityCreateUser' })
          }>
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <>
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
            </>
          )}
        </Formik>
      </Scroll>
    </Background>
  );
};
