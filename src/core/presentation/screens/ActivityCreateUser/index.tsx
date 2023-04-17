import React from 'react';
import { ActivityCreateUserForm } from '@core/infrastructure/validators/activityCreateUserSchema';
import { Formik } from 'formik';
import { useUser } from '@core/infrastructure/hooks/useUser';
import { useActivityStore } from '@core/infrastructure/store/activityStore';
import { buildOptionForm } from '@utils/helpers/help';
import Button from '@core/presentation/shared/Button';
import Background from '@core/presentation/shared/Background';
import Option from '@core/presentation/shared/Option';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';

const ActivityCreateUser: React.FC = () => {
  const { acitivityList } = useActivityStore();
  const { handleFormCreateUser } = useUser();

  const initialValuesForm = {
    activityDoc: '',
  };

  const onSubmit = (values: ActivityCreateUserForm) => {
    handleFormCreateUser(values, 'HeightCreateUser');
  };

  return (
    <Background>
      <Formik initialValues={initialValuesForm} onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, submitCount }) => (
          <StyledScroll>
            <Option
              label="Defina seu nível de atividade física diária"
              value={values.activityDoc}
              options={acitivityList?.map(buildOptionForm) || []}
              onChange={handleChange('activityDoc')}
              error={
                submitCount && errors.activityDoc ? errors.activityDoc : ''
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
