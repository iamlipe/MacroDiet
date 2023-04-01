import { Background } from '@components/Backgroud';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Container } from '@components/Container';
import { Header } from '@components/Header';
import { Icon } from '@components/Icon';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { buildOptions } from '@components/Option';
import { Scroll } from '@components/Scroll';
import { Select } from '@components/Select';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { IFood } from '@services/firebase/models/food';
import { IMeal } from '@services/firebase/models/meal';
import { useMeasureStore } from '@stores/measure';
import { Formik } from 'formik';
import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useFoodStore } from '@stores/food';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorite } from '@hooks/useFavorite';
import { useMeals } from '@hooks/useMeals';

interface CardInfoProps {
  info: string;
  quantity: number;
}

type StackParamsList = {
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
  const { goBack } = useNavigation<NavPropsDiet>();
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { measures } = useMeasureStore();
  const { foods } = useFoodStore();
  const { handleFavorite } = useFavorite();
  const { updateMeal, addFoodInMealSchema, initialValuesAddFoodInMeal } =
    useMeals({
      shouldUpdateStore: false,
    });
  const { colors, fonts, effects } = useTheme();

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
        title="Adicionar"
      />

      <Formik
        initialValues={initialValuesAddFoodInMeal}
        validationSchema={addFoodInMealSchema}
        onSubmit={values =>
          updateMeal({
            type: 'add',
            food: paramsFood.food,
            meal: paramsMeal.meal,
            measureId: values.food.measureId,
            quantity: Number(values.food.quantity),
          })
        }>
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

              {foods?.slice(0, 10).map(food => (
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
              <Button title="Adicionar alimento" onPress={handleSubmit} />
            </Container>
          </>
        )}
      </Formik>
    </Background>
  );
};
