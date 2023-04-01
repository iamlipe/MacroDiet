import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  Background,
  Header,
  Input,
  Scroll,
  DatePicker,
  Container,
  Button,
  Label,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { useUserStore } from '@stores/user';

export const Info = () => {
  const { goBack } = useNavigation<NavPropsLogged>();
  const { effects, fonts } = useTheme();
  const { user } = useUserStore();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Informações principais"
      />

      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          birthDate: user.info.birthDate
            ? new Date(user.info.birthDate.milliseconds).toDateString()
            : '',
        }}
        onSubmit={values => console.log(values)}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <Label
              fontFamily={fonts.family.medium}
              fontSize={fonts.size.s1}
              color={fonts.color.secundary}
              marginBottom={effects.spacing.vl}>
              Title
            </Label>

            <View>
              <Input
                name="name"
                label="nome"
                value={values.name}
                placeholder="Ex: Jose silva"
                onChangeText={handleChange('name')}
                marginBottom={effects.spacing.md}
                error={touched.name && errors.name ? errors.name : ''}
              />
              <Input
                name={'email'}
                label="email"
                value={values.email}
                placeholder="Ex: jose@email.com"
                onChangeText={handleChange('email')}
                marginBottom={effects.spacing.md}
                error={touched.email && errors.email ? errors.email : ''}
              />
              <Input
                name={'phone'}
                label="telefone"
                value={values.phone}
                placeholder="Ex: (11) 11111-1111"
                onChangeText={handleChange('phone')}
                marginBottom={effects.spacing.md}
                error={touched.phone && errors.phone ? errors.phone : ''}
              />

              <DatePicker
                name={'birthdate'}
                label="data de aniversario"
                value={values.birthDate}
                marginBottom={effects.spacing.md}
                onChange={handleChange('birthDate')}
                error={
                  touched.birthDate && errors.birthDate ? errors.birthDate : ''
                }
              />
            </View>

            <Container flex={1} justifyContent="flex-end">
              <Button title="salvar" onPress={handleSubmit} />
            </Container>
          </Scroll>
        )}
      </Formik>
    </Background>
  );
};
