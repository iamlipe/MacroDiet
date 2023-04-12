import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Background, Button, Option } from '@components/index';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';
import { useUserStore } from '@stores/index';
import { timeToGoal } from '@utils/options';
import useUser from '@hooks/useUser';

const GoalCreateUser = () => {
  const { handleFormCreateUser } = useUser();
  const { userCreate } = useUserStore();

  const optionsGoal = timeToGoal(
    userCreate.weight?.quantity,
    userCreate.goalWeight?.quantity,
  );

  const initialValuesTimeGoal = {
    timeInWeeks: '',
  };

  const timeGoalSchema = Yup.object().shape({
    timeInWeeks: Yup.string().required(
      'Por favor, selecione um tempo para seu objetivo.',
    ),
  });

  return (
    <Background>
      <Formik
        initialValues={initialValuesTimeGoal}
        validationSchema={timeGoalSchema}
        onSubmit={values =>
          handleFormCreateUser({
            values: {
              timeInWeeks: optionsGoal.find(
                item => item.key === values.timeInWeeks,
              ).value,
            },
            navigateTo: 'ConclusionCreateUser',
          })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <Option
              name="timeInWeeks"
              label="Escolha seu objetivo"
              value={values.timeInWeeks}
              options={optionsGoal}
              onChange={handleChange('timeInWeeks')}
              error={
                touched.timeInWeeks && errors.timeInWeeks
                  ? errors.timeInWeeks
                  : ''
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

export default GoalCreateUser;
