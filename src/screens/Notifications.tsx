import React from 'react';
import { Background } from '@components/Backgroud';
import { Header } from '@components/Header';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from '@components/Checkbox';
import { Scroll } from '@components/Scroll';
import { Formik } from 'formik';
import { Label } from '@components/Label';
import { View } from 'react-native';
import { Container } from '@components/Container';
import { Button } from '@components/index';
import { useTheme } from 'styled-components/native';
import { useNotification } from '@hooks/useNotification';

export const Notifications = () => {
  const { effects, fonts } = useTheme();
  const { goBack } = useNavigation();
  const { initialValuesNotifications } = useNotification({
    scheduleMealsNotificationToNextDays: 0,
    updateDisplayedNotifications: false,
  });

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Notificacoes"
      />

      <Formik
        initialValues={initialValuesNotifications}
        onSubmit={values => console.log(values)}>
        {({ handleChange, values, handleSubmit }) => (
          <Scroll>
            <Label
              fontFamily={fonts.family.medium}
              fontSize={fonts.size.s1}
              color={fonts.color.secundary}
              marginBottom={effects.spacing.vl}>
              Title
            </Label>

            <View>
              <Checkbox
                label="notificacoes de refeicoes"
                name={'receiveNotifiicationsMeals'}
                value={values.receiveNotifiicationsMeals}
                onChange={handleChange('receiveNotifiicationsMeals')}
                marginBottom={effects.spacing.md}
              />

              <Checkbox
                label="notificacoes de tomar agua"
                name={'reciveNotificationsDrinkWatter'}
                value={values.reciveNotificationsDrinkWatter}
                onChange={handleChange('reciveNotificationsDrinkWatter')}
                marginBottom={effects.spacing.hg}
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
