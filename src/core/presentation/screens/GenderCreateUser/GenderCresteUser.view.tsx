import React from 'react';
import { useGenderStore } from '@/core/infrastructure/store/genderStore';
import { buildOptionForm } from '@/utils/helpers/help';
import { useFormik } from 'formik';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import genderCreateUserSchema, {
  GenderCreateUserForm,
} from '@/core/infrastructure/validators/genderCreateUserSchema';
import Button from '@/core/presentation/shared/Button';
import Option from '@/core/presentation/shared/Option';
import { StyledLabel, StyledScroll, StyledWrapperButtonSubmit } from './styles';

const GenderCreateUserView: React.FC = () => {
  const { genderList } = useGenderStore();
  const { handleFormCreateUser } = useUser();

  const initialValues = {
    genderDoc: '',
  };

  const onSubmit = (values: GenderCreateUserForm) => {
    handleFormCreateUser(values, 'BirthDateCreateUser');
  };

  const { handleChange, values, handleSubmit, errors, submitCount } = useFormik(
    {
      initialValues,
      onSubmit,
      validationSchema: toFormikValidationSchema(genderCreateUserSchema),
    },
  );

  return (
    <StyledScroll>
      <StyledLabel>Selecione o seu gênero:</StyledLabel>

      <Option
        value={values.genderDoc}
        options={genderList?.map(buildOptionForm) || []}
        onChange={handleChange('genderDoc')}
        error={submitCount && errors.genderDoc ? errors.genderDoc : ''}
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

export default GenderCreateUserView;
