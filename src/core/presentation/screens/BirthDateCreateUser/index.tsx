import React from 'react';
import birthDateCreateUserSchema, {
  BirthDateCreateUserForm,
} from '@core/infrastructure/validators/birthDateCreateUserSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { formatDate } from '@utils/helpers/format';
import { useUser } from '@core/infrastructure/hooks/useUser';
import { Formik } from 'formik';
import Button from '@core/presentation/shared/Button';
import Background from '@core/presentation/shared/Background';
import DatePicker from '@core/presentation/shared/DatePicker';
import { StyledScroll, StyledWrapperButtonSubmit } from './styles';

const BirthDateCreateUser: React.FC = () => {
  const { handleFormCreateUser } = useUser();

  const initialValuesForm = {
    birthDate: '',
  };

  const onSubmit = (values: BirthDateCreateUserForm) => {
    const birthDate = formatDate(values.birthDate);
    handleFormCreateUser({ birthDate }, 'ActivityCreateUser');
  };

  return (
    <Background>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={toFormikValidationSchema(birthDateCreateUserSchema)}
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <DatePicker
              label="Qual a sua data de nascimento?"
              value={values.birthDate}
              placeholder="Selecione uma data"
              onChange={handleChange('birthDate')}
              error={
                touched.birthDate && errors.birthDate ? errors.birthDate : ''
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

export default BirthDateCreateUser;
