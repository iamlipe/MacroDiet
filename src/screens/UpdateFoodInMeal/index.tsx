import React, { useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavPropsDiet } from '@routes/dietStack';
import { NavPropsLogged } from '@routes/logged';
import { IFood } from '@services/firebase/models/food';
import { IMeal } from '@services/firebase/models/meal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore, useFoodStore, useMeasureStore } from '@stores/index';
import { useMeals, useFavorite, useMeasures } from '@hooks/index';
import { useTheme } from 'styled-components/native';
import { buildOptionForm } from '@utils/help';
import { Formik } from 'formik';
import { Background, Button, Header, Icon } from '@components/index';
import {
  StyledFormRow,
  StyledInput,
  StyledScroll,
  StyledSelect,
  StyledWrapperButtonSubmit,
  StyledTitleSection,
  StyledWrapperNutritionalInfo,
  StyledPortionNutritionalInfo,
  StyledCotainerNutrionalInfo,
  StyledBoxNutrionalInfo,
  StyledLabelNutrionalInfo,
  StyledCardFood,
  StyledRowFoodInfo,
  StyledTitleFood,
} from './styles';

interface IUpdateFoodInMealForm {
  food: {
    quantity: string;
    measureDoc: string;
  };
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

const UpdateFoodInMeal = () => {
  const {
    params: { meal },
  } = useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const {
    params: { food },
  } = useRoute<RouteProp<StackParamsList, 'FoodData'>>();
  const {
    params: { type },
  } = useRoute<RouteProp<StackParamsList, 'Info'>>();
  const { goBack } = useNavigation<NavPropsDiet>();
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { width } = useWindowDimensions();
  const { getMeasure } = useMeasures();
  const { foods } = useFoodStore();
  const { updateFavoritesFoods } = useFavorite();
  const { colors, fonts } = useTheme();
  const { handleFoodsInMeal, updateMeal } = useMeals();
  const { measureMassDefault } = useMeasureStore();
  const { user } = useUserStore();
  const insets = useSafeAreaInsets();

  const isFavorited = useMemo(
    () => user.preferences.favoritesFoods.includes(food.doc),
    [food.doc, user.preferences.favoritesFoods],
  );

  const initialValuesAddFoodInMeal: IUpdateFoodInMealForm = {
    food: {
      quantity: '',
      measureDoc: '',
    },
  };

  const addFoodInMealSchema = Yup.object().shape({
    food: Yup.object().shape({
      quantity: Yup.string().required(),
      measureDoc: Yup.string().required(),
    }),
  });

  const onSubmit = useCallback(
    async (values: IUpdateFoodInMealForm) => {
      const foodsInMeal = handleFoodsInMeal({
        type,
        food,
        meal,
        measureDoc: values.food.measureDoc,
        quantity: Number(values.food.quantity),
      });

      if (type === 'add') {
        await updateMeal({
          doc: meal.doc,
          updatedMeal: { foods: foodsInMeal },
        });
      } else {
        navigateLogged('EditMeal', {
          updatedMeal: { ...meal, foods: foodsInMeal },
        });
      }
    },
    [food, handleFoodsInMeal, meal, navigateLogged, type, updateMeal],
  );

  const renderCardInfo = (info: string, quantity: number) => {
    return (
      <StyledBoxNutrionalInfo key={info} width={width}>
        <StyledLabelNutrionalInfo>
          {info}
          {'\n'}
          {quantity.toFixed(0)}
        </StyledLabelNutrionalInfo>
      </StyledBoxNutrionalInfo>
    );
  };

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title={type === 'add' ? 'Adicionar' : 'Editar'}
      />

      <Formik
        initialValues={initialValuesAddFoodInMeal}
        validationSchema={addFoodInMealSchema}
        onSubmit={onSubmit}>
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <>
            <StyledScroll insets={insets}>
              <StyledRowFoodInfo>
                <StyledTitleFood>{food.name}</StyledTitleFood>

                <TouchableOpacity
                  onPress={() => updateFavoritesFoods(food.doc)}>
                  <Icon
                    name={isFavorited ? 'heart-filled' : 'heart'}
                    color={isFavorited ? colors.primary[500] : colors.white}
                    size={fonts.size.tl}
                  />
                </TouchableOpacity>
              </StyledRowFoodInfo>

              <StyledFormRow>
                <StyledInput
                  name="food.quantity"
                  placeholder="0"
                  value={values.food.quantity}
                  onChangeText={handleChange('food.quantity')}
                  error={
                    touched.food?.quantity && errors.food?.quantity
                      ? errors.food?.quantity
                      : ''
                  }
                />

                <StyledSelect
                  name="food.measureDoc"
                  value={values.food.measureDoc}
                  options={
                    food.measures
                      ? food.measures
                          .map(measureDoc => getMeasure(measureDoc))
                          .map(buildOptionForm)
                      : [buildOptionForm(measureMassDefault)]
                  }
                  onChange={handleChange('food.measureDoc')}
                  error={
                    touched.food?.measureDoc && errors.food?.measureDoc
                      ? errors.food?.measureDoc
                      : ''
                  }
                />
              </StyledFormRow>

              <StyledTitleSection>Informação nutricional</StyledTitleSection>

              <StyledWrapperNutritionalInfo>
                <StyledPortionNutritionalInfo>
                  Porção de 100g
                </StyledPortionNutritionalInfo>

                <StyledCotainerNutrionalInfo>
                  {renderCardInfo('kcal', food.info.kcalPerGram * 100)}
                  {renderCardInfo('carb', food.info.carbPerGram * 100)}
                  {renderCardInfo('prot', food.info.protPerGram * 100)}
                  {renderCardInfo('gord', food.info.fatPerGram * 100)}
                  {renderCardInfo('sódio', food.info.sodiumPerGram * 100)}
                  {renderCardInfo('fibra', food.info.fiberPerGram * 100)}
                </StyledCotainerNutrionalInfo>
              </StyledWrapperNutritionalInfo>

              {type === 'add' ? (
                <>
                  <StyledTitleSection>
                    Alimentos que podem substituir
                  </StyledTitleSection>

                  {foods?.slice(0, 4).map(item => (
                    <StyledCardFood title={item.name} type="bottomLine" />
                  ))}
                </>
              ) : null}
            </StyledScroll>

            <StyledWrapperButtonSubmit insets={insets}>
              <Button
                title={
                  type === 'add' ? 'Adicionar alimento' : 'Editar alimento'
                }
                onPress={handleSubmit}
              />
            </StyledWrapperButtonSubmit>
          </>
        )}
      </Formik>
    </Background>
  );
};

export default UpdateFoodInMeal;
