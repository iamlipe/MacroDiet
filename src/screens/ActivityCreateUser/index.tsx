import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Background, Button, Option } from '@components/index';
import { buildOptionForm } from '@utils/help';
import { useActivityStore } from '@stores/index';
import { useUser } from '@hooks/index';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';

const ActivityCreateUser = () => {
  const { handleFormCreateUser } = useUser();
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
          handleFormCreateUser({ values, navigateTo: 'HeightCreateUser' })
        }>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <Option
              name="activityDoc"
              label="Defina seu nível de atividade física diária"
              value={values.activityDoc}
              options={
                acitivities
                  ?.sort((a, b) => a.factor - b.factor)
                  .map(buildOptionForm) || []
              }
              onChange={handleChange('activityDoc')}
              error={
                touched.activityDoc && errors.activityDoc
                  ? errors.activityDoc
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

export default ActivityCreateUser;
