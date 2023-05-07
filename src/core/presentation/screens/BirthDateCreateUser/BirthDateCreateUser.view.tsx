import React from 'react';
import birthDateCreateUserSchema, {
  BirthDateCreateUserForm,
} from '@/core/infrastructure/validators/birthDateCreateUserSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { formatDate } from '@/utils/helpers/format';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { useFormik } from 'formik';
import { StyledLabel, StyledScroll, StyledWrapperButtonSubmit } from './styles';
import Button from '@/core/presentation/shared/Button';
import DatePicker from '@/core/presentation/shared/DatePicker';

const BirthDateCreateUserView: React.FC = () => {
  const { handleFormCreateUser } = useUser();

  const initialValues = {
    birthDate: '',
  };

  const onSubmit = (values: BirthDateCreateUserForm) => {
    const birthDate = formatDate(values.birthDate);
    handleFormCreateUser({ birthDate }, 'ActivityCreateUser');
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(birthDateCreateUserSchema),
  });

  return (
    <StyledScroll>
      <StyledLabel>Selecione a sua data de nascimento:</StyledLabel>

      <DatePicker
        value={values.birthDate}
        placeholder="Ex: 01/01/2000"
        onChange={handleChange('birthDate')}
        error={touched.birthDate && errors.birthDate ? errors.birthDate : ''}
      />

      <StyledWrapperButtonSubmit>
        <Button
          title="Proximo"
          icon={{ name: 'long-right' }}
          onPress={handleSubmit}
        />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default BirthDateCreateUserView;
