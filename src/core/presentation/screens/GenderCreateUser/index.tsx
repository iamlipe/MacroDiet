import React from 'react';
import { useGenderStore } from '@core/infrastructure/store/genderStore';
import { buildOptionForm } from '@utils/helpers/help';
import { Formik } from 'formik';
import { useUser } from '@core/infrastructure/hooks/useUser';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import genderCreateUserSchema, {
  GenderCreateUserForm,
} from '@core/infrastructure/validators/genderCreateUserSchema';
import Button from '@core/presentation/shared/Button';
import Option from '@core/presentation/shared/Option';
import Background from '@core/presentation/shared/Background';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';

const GenderCreateUser: React.FC = () => {
  const { genderList } = useGenderStore();
  const { handleFormCreateUser } = useUser();

  const initialValuesForm = {
    genderDoc: '',
  };

  const onSubmit = (values: GenderCreateUserForm) => {
    handleFormCreateUser(values, 'BirthDateCreateUser');
  };

  return (
    <Background>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={toFormikValidationSchema(genderCreateUserSchema)}
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, submitCount }) => (
          <StyledScroll>
            <Option
              label="sexo"
              value={values.genderDoc}
              options={genderList?.map(buildOptionForm) || []}
              onChange={handleChange('genderDoc')}
              error={submitCount && errors.genderDoc ? errors.genderDoc : ''}
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

export default GenderCreateUser;
