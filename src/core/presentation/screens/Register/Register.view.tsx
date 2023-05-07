import React from 'react';
import registerSchema, {
  RegisterForm,
} from '@/core/infrastructure/validators/registerSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRegister } from '@/core/infrastructure/hooks/useRegister';
import { useFormik } from 'formik';
import Button from '@/core/presentation/shared/Button';
import {
  StyledInput,
  StyledScroll,
  StyledSubtitle,
  StyledTerms,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const RegisterView: React.FC = () => {
  const { register, isLoading } = useRegister();

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values: RegisterForm) => {
    await register(values);
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    submitCount,
    errors,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(registerSchema),
  });

  return (
    <StyledScroll>
      <StyledTitle> Cadastre-se agora</StyledTitle>
      <StyledSubtitle>
        Insira seus dados pessoais para criar uma conta gratuita e começar a
        usar nosso serviço.
      </StyledSubtitle>

      <StyledInput
        label="nome completo"
        placeholder="Ex: jose silva"
        value={values.fullName}
        onChangeText={handleChange('fullName')}
        error={submitCount && errors.fullName ? errors.fullName : ''}
      />

      <StyledInput
        label="e-mail"
        placeholder="Ex: jose@email.com"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        error={submitCount && errors.email ? errors.email : ''}
      />

      <StyledInput
        label="senha"
        placeholder="********"
        secureTextEntry
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        error={submitCount && errors.password ? errors.password : ''}
      />

      <StyledInput
        label="confirmar senha"
        placeholder="********"
        secureTextEntry
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        error={
          submitCount && errors.confirmPassword ? errors.confirmPassword : ''
        }
      />

      <StyledWrapperButtonSubmit>
        <StyledTerms>
          Ao cadastrar você concorda com nossos termos e condições
        </StyledTerms>

        <Button title="Registrar" onPress={handleSubmit} loading={isLoading} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default RegisterView;
