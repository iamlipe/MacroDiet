import React from 'react';
import loginSchema, {
  LoginForm,
} from '@core/infrastructure/validators/loginSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useLogin } from '@core/infrastructure/hooks/useLogin';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@core/presentation/routes/auth';
import { Formik } from 'formik';
import { View } from 'react-native';
import { StyledInput, StyledScroll, StyledWrapperButtonSubmit } from './styles';
import Link from '@core/presentation/shared/Link';
import Button from '@core/presentation/shared/Button';
import Background from '@core/presentation/shared/Background';

const LoginWithEmail: React.FC = () => {
  const { loginWithEmail, isLoading } = useLogin();
  const { navigate: navigateAuth } = useNavigation<NavPropsAuth>();

  const initialValuesForm = {
    email: '',
    password: '',
  };

  const onSubmit = async ({ email, password }: LoginForm) => {
    await loginWithEmail({ email, password });
  };

  return (
    <Background>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={toFormikValidationSchema(loginSchema)}
        onSubmit={onSubmit}>
        {({ handleChange, handleSubmit, values, errors, submitCount }) => (
          <StyledScroll>
            <View>
              <StyledInput
                label="e-mail"
                placeholder="Ex: joao@email.com"
                value={values.email.toLowerCase()}
                onChangeText={handleChange('email')}
                error={submitCount && errors.email ? errors.email : ''}
              />

              <StyledInput
                label="Senha"
                placeholder="********"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                error={submitCount && errors.password ? errors.password : ''}
              />
            </View>

            <Link
              title="Esqueceu sua senha ?"
              onPress={() => navigateAuth('RecoveryPassword')}
            />

            <StyledWrapperButtonSubmit>
              <Button
                title="Entrar"
                onPress={() => handleSubmit()}
                loading={isLoading}
              />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default LoginWithEmail;
