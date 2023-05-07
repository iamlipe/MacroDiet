import React from 'react';
import updateUserInfoSchema, {
  UpdateUserInfoForm,
} from '@/core/infrastructure/validators/updateUserInfoSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { formatFullName } from '@/utils/helpers/format';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { View } from 'react-native';
import { useFormik } from 'formik';
import Button from '@/core/presentation/shared/Button';
import { StyledInput, StyledScroll, StyledWrapperButtonSubmit } from './styles';

const EditUserInfoView = () => {
  const { goBack } = useNavigation<NavPropsLogged>();
  const { user } = useUserStore();
  const { updateUser } = useUser();

  const initialValues = {
    name: `${user?.firstName} ${user?.lastName}`,
    email: user?.email || '',
  };

  const onSubmit = async (values: UpdateUserInfoForm) => {
    const firstName = formatFullName(values.name).firstName;
    const lastName = formatFullName(values.name).lastName;

    if (firstName && lastName) {
      await updateUser({
        firstName,
        lastName,
        email: values.email,
      });

      goBack();
    }
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(updateUserInfoSchema),
  });

  return (
    <StyledScroll>
      <View>
        <StyledInput
          label="nome"
          value={values.name}
          placeholder="Ex: José silva"
          onChangeText={handleChange('name')}
          error={touched.name && errors.name ? errors.name : ''}
        />
        <StyledInput
          label="email"
          value={values.email}
          placeholder="Ex: jose@email.com"
          onChangeText={handleChange('email')}
          error={touched.email && errors.email ? errors.email : ''}
        />
      </View>

      <StyledWrapperButtonSubmit>
        <Button title="salvar" onPress={handleSubmit} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default EditUserInfoView;
