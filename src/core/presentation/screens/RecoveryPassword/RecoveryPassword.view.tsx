import React from 'react';
import recoveryPasswordSchema, {
  RecoveryPasswordForm,
} from '@/core/infrastructure/validators/recoveryPasswordSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRecoveryPassword } from '@/core/infrastructure/hooks/useRecoveryPassword';
import { useFormik } from 'formik';
import { View } from 'react-native';
import Button from '@/core/presentation/shared/Button';
import {
  StyledInput,
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const RecoveryPasswordView: React.FC = () => {
  const { recoveryPassword, isLoading } = useRecoveryPassword();

  const initialValues = {
    email: '',
  };

  const onSubmit = async ({ email }: RecoveryPasswordForm) => {
    await recoveryPassword(email);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(recoveryPasswordSchema),
  });

  return (
    <StyledScroll>
      <StyledTitle>Recupere sua senha facilmente!</StyledTitle>
      <StyledSubtitle>
        Insira seu e-mail abaixo e enviaremos um link para redefinir sua senha.
      </StyledSubtitle>

      <View>
        <StyledInput
          label="e-mail"
          placeholder="Ex: joao@email.com"
          value={values.email.toLowerCase()}
          onChangeText={handleChange('email')}
          error={touched.email && errors.email ? errors.email : ''}
        />
      </View>

      <StyledWrapperButtonSubmit>
        <Button title="Enviar" loading={isLoading} onPress={handleSubmit} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default RecoveryPasswordView;
