import React from 'react';
import * as Yup from 'yup';
import { useCreateUser } from '@hooks/index';
import { useGoalStore } from '@stores/index';
import { buildOptionForm } from '@utils/help';
import { Formik } from 'formik';
import { Background, Button, Option } from '@components/index';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';

const GoalCreateUser = () => {
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
          <StyledScroll>
            <Option
              name="goalDoc"
              label="Escolha seu objetivo"
              value={values.goalDoc}
              options={goals?.map(buildOptionForm) || []}
              onChange={handleChange('goalDoc')}
              error={touched.goalDoc && errors.goalDoc ? errors.goalDoc : ''}
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

export default GoalCreateUser;
