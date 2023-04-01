import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Label } from '@components/Label';
import { buildOptions, Option } from '@components/Option';
import { Scroll } from '@components/Scroll';
import { useCreateUser } from '@hooks/useCreateUser';
import { useActivityStore } from '@stores/acitivity';
import { Formik } from 'formik';
import React from 'react';
import { useTheme } from 'styled-components/native';

export const ActivityCreateUser = () => {
  const { activitySchema, handleForm, initialValuesActivity } = useCreateUser();
  const { acitivities } = useActivityStore();
  const { effects, fonts } = useTheme();

  return (
    <Background>
      <Scroll>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.md}
        />

        <Formik
          initialValues={initialValuesActivity}
          validationSchema={activitySchema}
          onSubmit={values =>
            handleForm({ values, navigateTo: 'BirthDateCreateUser' })
          }>
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <>
              <Option
                name="activityId"
                label="Defina seu nível de atividade física diária"
                value={values.activityId}
                options={acitivities?.map(buildOptions) || []}
                onChange={handleChange('activityId')}
                error={
                  touched.activityId && errors.activityId
                    ? errors.activityId
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
            </>
          )}
        </Formik>
      </Scroll>
    </Background>
  );
};
