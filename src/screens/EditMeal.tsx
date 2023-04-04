import React, { useCallback, useRef, useState } from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { IMeal } from '@services/firebase/models/meal';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { useMeals, useFoods } from '@hooks/index';
import { useTheme } from 'styled-components/native';
import { Formik } from 'formik';
import {
  Card,
  Input,
  Loading,
  Scroll,
  Background,
  Button,
  Container,
  DatePicker,
  Header,
  Label,
  BottomSheet,
} from '@components/index';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type StackParamsList = {
  MealData: {
    meal: IMeal;
  };

  UpdatedMealData: {
    updatedMeal: IMeal;
  };
};

export const EditMeal = () => {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { params: paramsUpdatedMeal } =
    useRoute<RouteProp<StackParamsList, 'UpdatedMealData'>>();
  const [dataMeal, setDataMeal] = useState<IMeal | null>(null);
  const { goBack, navigate: navigateDiet } = useNavigation<NavPropsLogged>();
  const { getFood, handleFood } = useFoods();
  const { updateMeal, handleFoodsInMeal } = useMeals();
  const { effects, fonts } = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useFocusEffect(
    useCallback(() => {
      setDataMeal(paramsUpdatedMeal.updatedMeal || paramsMeal.meal);
    }, [paramsMeal.meal, paramsUpdatedMeal.updatedMeal]),
  );

  const initialValues = {
    name: dataMeal?.title,
    mealTime: moment(new Date(dataMeal?.time.milliseconds)).format(),
  };

  const editMealSchema = Yup.object().shape({
    name: Yup.string().required(),
    mealTime: Yup.string().required(),
  });

  if (!dataMeal) {
    return <Loading />;
  }

  return (
    <Background>
      <Header left={{ iconName: 'arrow-left', press: goBack }} title="Editar" />

      <Formik
        initialValues={initialValues}
        validationSchema={editMealSchema}
        onSubmit={async values => {
          const date = new Date(values.mealTime);

          await updateMeal({
            doc: dataMeal?.doc,
            updatedMeal: {
              title: values.name,
              time: {
                milliseconds: date.getTime(),
                nanoseconds: date.getTime() * 1000000,
              },
              foods: dataMeal?.foods,
            },
          });
        }}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <Scroll>
            <>
              <Input
                name="name"
                label="Nome"
                placeholder="dwdwef"
                value={values.name}
                onChangeText={handleChange('name')}
                error={touched.name && errors.name ? errors.name : ''}
                marginBottom={effects.spacing.md}
              />

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

              <Container marginBottom={effects.spacing.hg}>
                {dataMeal?.foods.map(food => (
                  <Card
                    title={handleFood(food).title}
                    description={handleFood(food).kcal}
                    subtitle={handleFood(food).quantity}
                    type="bottomLine"
                    marginBottom={effects.spacing.md}
                    onPress={() => {
                      bottomSheetRef.current.present();
                      setSelectedFood(food.foodDoc);
                    }}
                  />
                ))}
              </Container>
            </>

            <Container flex={1} justifyContent="flex-end">
              <Button
                title="Excluir"
                type="outlined"
                marginBottom={effects.spacing.md}
                onPress={() => null}
              />
              <Button title="Editar" onPress={handleSubmit} />
            </Container>
          </Scroll>
        )}
      </Formik>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['20%']}
        close={() => bottomSheetRef.current.close()}>
        <Container paddingHorizontal={effects.spacing.md}>
          <Button
            title={'Editar'}
            type="link"
            onPress={() => {
              if (selectedFood) {
                navigateDiet('UpdateFoodInMeal', {
                  type: 'edit',
                  food: getFood(selectedFood),
                  meal: dataMeal,
                });
              }

              bottomSheetRef.current.close();
            }}
            marginBottom={effects.spacing.lg}
          />
          <Button
            title={'Excluir'}
            type="link"
            onPress={() => {
              if (selectedFood) {
                const foodsInMeal = handleFoodsInMeal({
                  type: 'remove',
                  meal: dataMeal,
                  food: getFood(selectedFood),
                });

                setDataMeal({ ...dataMeal, foods: foodsInMeal });
              }

              bottomSheetRef.current.close();
            }}
            marginBottom={effects.spacing.lg}
          />
        </Container>
      </BottomSheet>
    </Background>
  );
};
