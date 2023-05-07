import React from 'react';
import Button from '@/core/presentation/shared/Button';
import { StyledInput, StyledScroll, StyledWrapperButtonSubmit } from './styles';
import { useFormik } from 'formik';
import { View } from 'react-native';

const ChangePasswordView: React.FC = () => {
  const initialValues = {
    currPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  // NOTE: implements here
  const onSubmit = () => {};

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <StyledScroll>
      <View>
        <StyledInput
          label="Senha atual"
          value={values.currPassword}
          onChangeText={handleChange('currPassword')}
        />

        <StyledInput
          label="Nova senha"
          value={values.newPassword}
          onChangeText={handleChange('newPassword')}
        />

        <StyledInput
          label="Confirmar senha"
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
        />
      </View>

      <StyledWrapperButtonSubmit>
        <Button title={'Trocar'} onPress={handleSubmit} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default ChangePasswordView;
