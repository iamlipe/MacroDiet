import React from 'react';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useRecoveryPassword } from '@hooks/index';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Background, Button, Header } from '@components/index';
import {
  StyledInput,
  StyledScroll,
  StyledSubtitle,
  StyledTitle,
  StyledWrapperButtonSubmit,
} from './styles';

const RecoveryPassword = () => {
  const { goBack } = useNavigation();
  const { handleRecoveryPassword, loading } = useRecoveryPassword();

  const initialValuesRecoveryPassword = {
    email: '',
  };

  const recoveryPasswordSchema = Yup.object().shape({
    email: Yup.string().email('email invalido').required(),
  });

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Recuperar senha"
      />

      <Formik
        initialValues={initialValuesRecoveryPassword}
        validationSchema={recoveryPasswordSchema}
        onSubmit={handleRecoveryPassword}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <StyledScroll>
            <StyledTitle>Recupere sua senha facilmente!</StyledTitle>
            <StyledSubtitle>
              Insira seu e-mail abaixo e enviaremos um link para redefinir sua
              senha.
            </StyledSubtitle>

            <View>
              <StyledInput
                name="email"
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
                disabled={loading}
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
