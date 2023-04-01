import React from 'react';
import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { DatePicker } from '@components/DatePicker';
import { Header } from '@components/Header';
import { Label } from '@components/Label';
import { useFoods } from '@hooks/useFoods';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { IFoodMeal, IMeal } from '@services/firebase/models/meal';
import { FlashList } from '@shopify/flash-list';
import { Formik } from 'formik';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Card } from '@components/index';

type StackParamsList = {
  MealData: {
    meal: IMeal;
  };

  UpdatedMeal: {
    meal: IMeal;
  };
};

export const EditMeal = () => {
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { params: paramsUpdatedMeal } =
    useRoute<RouteProp<StackParamsList, 'UpdatedMeal'>>();
  const dataMeal = paramsUpdatedMeal || paramsMeal;
  const { goBack, navigate: navigateDiet } = useNavigation<NavPropsLogged>();
  const { getFoodById } = useFoods({ shouldUpdateStore: false });
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const { effects, fonts } = useTheme();

  const renderCardFood = ({ item }: { item: IFoodMeal }) => {
    const food = getFoodById(item.foodId);

    return (
      <Card
        title={food.name}
        type="bottomLine"
        marginBottom={effects.spacing.md}
        onPress={() => {
          navigateDiet('UpdateFoodInMeal', {
            food,
            meal: dataMeal.meal,
          });
        }}
      />
    );
  };

  return (
    <Background>
      <Header left={{ iconName: 'arrow-left', press: goBack }} title="Editar" />

      <Formik
        initialValues={{
          mealTime: new Date(dataMeal.meal.time.milliseconds).toDateString(),
        }}
        onSubmit={values => console.log(values)}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <>
            <Container flex={1} paddingHorizontal={effects.spacing.md}>
              <DatePicker
                name="mealTime"
                label="Horario da refeição"
                mode="time"
                onChange={handleChange('mealTime')}
                value={values.mealTime}
                marginBottom={effects.spacing.hg}
                error={
                  touched.mealTime && errors.mealTime ? errors.mealTime : ''
                }
              />

              <Label
                fontFamily={fonts.family.medium}
                fontSize={fonts.size.s1}
                marginBottom={effects.spacing.md}>
                Comidas
              </Label>

              <FlashList
                data={dataMeal.meal.foods}
                estimatedItemSize={10}
                keyExtractor={({ foodId }) => foodId}
                ListEmptyComponent={<></>}
                renderItem={({ item }) => renderCardFood({ item })}
              />
            </Container>

            <Container
              position="absolute"
              bottom={0}
              width={width}
              height={160 + bottom}
              justifyContent="center"
              paddingHorizontal={effects.spacing.md}
              paddingBottom={bottom}>
              <Button
                title="Excluir"
                type="outlined"
                marginBottom={effects.spacing.md}
                onPress={() => null}
              />
              <Button title="Editar" onPress={handleSubmit} />
            </Container>
          </>
        )}
      </Formik>
    </Background>
  );
};
