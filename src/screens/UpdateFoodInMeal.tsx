import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { NavPropsLogged } from '@routes/logged';
import { IFood } from '@services/firebase/models/food';
import { IMeal } from '@services/firebase/models/meal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMeasureStore } from '@stores/measure';
import { useFoodStore } from '@stores/food';
import { useMeals, useFavorite } from '@hooks/index';
import { useTheme } from 'styled-components/native';
import { Formik } from 'formik';
import {
  Background,
  Button,
  Card,
  Container,
  Header,
  Icon,
  Input,
  Label,
  Scroll,
  Select,
} from '@components/index';
import { buildOptions } from '@components/Option';
import * as Yup from 'yup';

interface CardInfoProps {
  info: string;
  quantity: number;
}

type StackParamsList = {
  Info: {
    type: 'add' | 'remove';
  };

  MealData: {
    meal: IMeal;
  };

  FoodData: {
    food: IFood;
  };
};

export const UpdateFoodInMeal = () => {
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { params: paramsFood } =
    useRoute<RouteProp<StackParamsList, 'FoodData'>>();
  const { params: paramsInfo } = useRoute<RouteProp<StackParamsList, 'Info'>>();
  const { goBack } = useNavigation<NavPropsDiet>();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { measures } = useMeasureStore();
  const { foods } = useFoodStore();
  const { handleFavorite } = useFavorite();
  const { colors, fonts, effects } = useTheme();
  const { handleFoodsInMeal, updateMeal } = useMeals();

  const initialValuesAddFoodInMeal = {
    food: {
      quantity: '',
      measureId: '',
    },
  };

  const addFoodInMealSchema = Yup.object().shape({
    food: Yup.object().shape({
      quantity: Yup.string().required(),
      measureId: Yup.string().required(),
    }),
  });

  const renderCardInfo = ({ info, quantity }: CardInfoProps) => {
    return (
      <Container
        width={(width - 64) * 0.31}
        height={60}
        alignItems="center"
        justifyContent="center"
        borderRadius={effects.border.radius.sm}
        backgroundColor={colors.primary[200]}
        marginBottom={(width - 64) * 0.04}>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.lg}
          textAlign="center">
          {info}
          {'\n'}
          {quantity}
        </Label>
      </Container>
    );
  };

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title={paramsInfo.type === 'add' ? 'Adicionar' : 'Editar'}
      />

      <Formik
        initialValues={initialValuesAddFoodInMeal}
        validationSchema={addFoodInMealSchema}
        onSubmit={async values => {
          const foodsInMeal = handleFoodsInMeal({
            type: paramsInfo.type,
            food: paramsFood.food,
            meal: paramsMeal.meal,
            measureId: values.food.measureId,
            quantity: Number(values.food.quantity),
          });

          if (paramsInfo.type === 'add') {
            await updateMeal({
              doc: paramsMeal.meal.doc,
              updatedMeal: { foods: foodsInMeal },
            });
          } else {
            navigateLogged('EditMeal', {
              updatedMeal: { ...paramsMeal.meal, foods: foodsInMeal },
            });
          }
        }}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <>
            <Scroll style={{ marginBottom: 100 + bottom }}>
              <Container
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={effects.spacing.vl}>
                <Label
                  fontFamily={fonts.family.medium}
                  fontSize={fonts.size.tl}>
                  {paramsFood.food.name}
                </Label>

                <TouchableOpacity onPress={handleFavorite}>
                  <Icon
                    name="heart"
                    color={colors.gray.white}
                    size={fonts.size.tl}
                  />
                </TouchableOpacity>
              </Container>

              <Container
                flexDirection="row"
                alignItems="flex-end"
                marginBottom={effects.spacing.vl}>
                <Input
                  name="food.quantity"
                  placeholder="0"
                  value={values.food.quantity}
                  onChangeText={handleChange('food.quantity')}
                  error={
                    touched.food?.quantity && errors.food?.quantity
                      ? errors.food?.quantity
                      : ''
                  }
                  inputStyle={{ textAlign: 'center' }}
                />

                <Select
                  flex={2}
                  name="food.measureId"
                  value={values.food.measureId}
                  options={measures?.mass.map(buildOptions) || []}
                  onChange={handleChange('food.measureId')}
                  marginLeft={effects.spacing.md}
                  error={
                    touched.food?.measureId && errors.food?.measureId
                      ? errors.food?.measureId
                      : ''
                  }
                  inputStyle={{ textAlign: 'center' }}
                />
              </Container>

              <Label
                fontFamily={fonts.family.medium}
                fontSize={fonts.size.s2}
                marginBottom={effects.spacing.lg}>
                Informação nutricional
              </Label>

              <Container padding={effects.spacing.md}>
                <Label
                  fontSize={fonts.size.lg}
                  marginBottom={effects.spacing.lg}>
                  Porção de 100g
                </Label>

                <Container
                  flexDirection="row"
                  justifyContent="space-between"
                  flexWrap="wrap">
                  {renderCardInfo({
                    info: 'kcal',
                    quantity: paramsFood.food.info.kcalPerGram * 100,
                  })}
                  {renderCardInfo({
                    info: 'carb',
                    quantity: paramsFood.food.info.carbPerGram * 100,
                  })}
                  {renderCardInfo({
                    info: 'prot',
                    quantity: paramsFood.food.info.protPerGram * 100,
                  })}
                  {renderCardInfo({
                    info: 'gord',
                    quantity: paramsFood.food.info.fatPerGram * 100,
                  })}
                  {renderCardInfo({
                    info: 'sódio',
                    quantity: paramsFood.food.info.sodiumPerGram * 100,
                  })}
                  {renderCardInfo({
                    info: 'fibra',
                    quantity: paramsFood.food.info.fiberPerGram * 100,
                  })}
                </Container>
              </Container>

              <Label
                fontFamily={fonts.family.medium}
                fontSize={fonts.size.s2}
                marginBottom={effects.spacing.lg}>
                Alimentos que podem substituir
              </Label>

              {foods?.slice(0, 4).map(food => (
                <Card
                  title={food.name}
                  type="bottomLine"
                  marginBottom={effects.spacing.md}
                />
              ))}
            </Scroll>

            <Container
              position="absolute"
              bottom={0}
              width={width}
              height={100 + bottom}
              justifyContent="center"
              backgroundColor={colors.background.dark}
              paddingBottom={bottom}
              paddingHorizontal={effects.spacing.md}>
              <Button
                title={
                  paramsInfo.type === 'add'
                    ? 'Adicionar alimento'
                    : 'Editar alimento'
                }
                onPress={handleSubmit}
              />
            </Container>
          </>
        )}
      </Formik>
    </Background>
  );
};
