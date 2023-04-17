import React from 'react';
import recoveryPasswordSchema, {
  RecoveryPasswordForm,
} from '@core/infrastructure/validators/recoveryPasswordSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRecoveryPassword } from '@core/infrastructure/hooks/useRecoveryPassword';
import { Formik } from 'formik';
import { View } from 'react-native';
import Background from '@core/presentation/shared/Background';
import Button from '@core/presentation/shared/Button';
import {
  StyledInput,
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const RecoveryPassword: React.FC = () => {
  const { recoveryPassword, isLoading } = useRecoveryPassword();

  const initialValuesForm = {
    email: '',
  };

  const onSubmit = async ({ email }: RecoveryPasswordForm) => {
    await recoveryPassword(email);
  };
  return (
    <Background>
      <Formik
        initialValues={initialValuesForm}
        validationSchema={toFormikValidationSchema(recoveryPasswordSchema)}
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <StyledTitle>Recupere sua senha facilmente!</StyledTitle>
            <StyledSubtitle>
              Insira seu e-mail abaixo e enviaremos um link para redefinir sua
              senha.
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
              <Button
                title="Enviar"
                loading={isLoading}
                onPress={handleSubmit}
              />
            </StyledWrapperButtonSubmit>
          </StyledScroll>
        )}
      </Formik>
    </Background>
  );
};

export default RecoveryPassword;
