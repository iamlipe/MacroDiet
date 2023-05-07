import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import addFoodInMealSchema, {
  AddFoodInMealForm,
} from '@/core/infrastructure/validators/addFoodInMealSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { handleFoodsInMeal } from '@/utils/helpers/handleMeal';
import { MeasureProps } from '@/core/domain/models/Measure';
import { FoodProps } from '@/core/domain/models/Food';
import { MealProps } from '@/core/domain/models/Meal';
import { NavPropsLogged } from '@/core/presentation/routes/logged';
import { useMeasure } from '@/core/infrastructure/hooks/useMeasure';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { useFoodStore } from '@/core/infrastructure/store/foodStore';
import { useMeals } from '@/core/infrastructure/hooks/useMeals';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { buildOptionForm } from '@/utils/helpers/help';
import Button from '@/core/presentation/shared/Button';
import Lottie from 'lottie-react-native';
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
  StyledLottieHeart,
} from './styles';

interface UpdateFoodInMealViewProps {
  meal: MealProps;
  food: FoodProps;
  type: 'add' | 'remove';
}

const UpdateFoodInMealView: React.FC<UpdateFoodInMealViewProps> = ({
  meal,
  food,
  type,
}) => {
  const { goBack, navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { width } = useWindowDimensions();
  const { infoMeasure, getMeasureMassDefault } = useMeasure();
  const { foodList } = useFoodStore();
  const { updateMeal } = useMeals();
  const { updateUser } = useUser();
  const { user } = useUserStore();
  const animationRef = useRef<Lottie>(null);
  const insets = useSafeAreaInsets();

  const isFavorited = useMemo(() => {
    if (user?.preferences) {
      return user?.preferences?.favoritesFoods.includes(food.doc);
    }
  }, [food.doc, user?.preferences]);

  const measureMassDefault = useMemo(() => {
    return getMeasureMassDefault();
  }, [getMeasureMassDefault]);

  const optionMeasuresFood = useMemo(() => {
    const foodMeasures = food.measures
      ?.map(measureDoc => infoMeasure(measureDoc))
      .filter(item => item) as MeasureProps[] | null;

    if (measureMassDefault) {
      const measure = foodMeasures
        ?.map(item => buildOptionForm(item))
        .filter(item => item) as { key: string; name: string }[] | null;

      return measure ?? [buildOptionForm(measureMassDefault)];
    }

    return [];
  }, [food.measures, infoMeasure, measureMassDefault]);

  const onFavoriteFood = useCallback(async () => {
    if (!isFavorited) {
      animationRef.current?.play(0, 20);
    } else {
      animationRef.current?.play(0, 0);
    }

    if (user?.preferences) {
      const newFavoriteFoodList = isFavorited
        ? [
            ...user?.preferences?.favoritesFoods.filter(
              foodDoc => foodDoc !== food.doc,
            ),
          ]
        : [...user?.preferences?.favoritesFoods, food.doc];

      await updateUser({
        preferences: {
          ...user?.preferences,
          favoritesFoods: newFavoriteFoodList,
        },
      });
    }
  }, [food.doc, isFavorited, updateUser, user?.preferences]);

  const initialValues: AddFoodInMealForm = {
    food: {
      quantity: '',
      measureDoc: '',
    },
  };

  const onSubmit = async (values: AddFoodInMealForm) => {
    const foodsInMeal = handleFoodsInMeal(
      type,
      meal,
      food,
      Number(values.food.quantity),
      values.food.measureDoc,
    );

    if (type === 'add' && foodsInMeal) {
      await updateMeal({ ...meal, foods: foodsInMeal });
      goBack();
    } else if (foodsInMeal) {
      navigateLogged('EditMeal', {
        updatedMeal: { ...meal, foods: foodsInMeal },
      });
    }
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(addFoodInMealSchema),
  });

  useEffect(() => {
    if (isFavorited) {
      animationRef.current?.play(20, 20);
    } else {
      animationRef.current?.play(0, 0);
    }
  }, [isFavorited]);

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
    <React.Fragment>
      <StyledScroll insets={insets}>
        <StyledRowFoodInfo>
          <StyledTitleFood>{food.name}</StyledTitleFood>

          <TouchableOpacity onPress={onFavoriteFood}>
            <StyledLottieHeart
              ref={animationRef}
              source={require('@/assets/lotties/heart.json')}
              loop={false}
            />
          </TouchableOpacity>
        </StyledRowFoodInfo>

        <StyledFormRow>
          <StyledInput
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
            value={values.food.measureDoc}
            options={optionMeasuresFood}
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
            {renderCardInfo('sódio', (food.info.sodiumPerGram || 0) * 100)}
            {renderCardInfo('fibra', (food.info.fiberPerGram || 0) * 100)}
          </StyledCotainerNutrionalInfo>
        </StyledWrapperNutritionalInfo>

        {type === 'add' ? (
          <>
            <StyledTitleSection>
              Alimentos que podem substituir
            </StyledTitleSection>

            {foodList?.slice(0, 4).map(item => (
              <StyledCardFood
                key={item.doc}
                title={item.name}
                type="bottomLine"
              />
            ))}
          </>
        ) : null}
      </StyledScroll>

      <StyledWrapperButtonSubmit insets={insets}>
        <Button
          title={type === 'add' ? 'Adicionar alimento' : 'Editar alimento'}
          onPress={handleSubmit}
        />
      </StyledWrapperButtonSubmit>
    </React.Fragment>
  );
};

export default UpdateFoodInMealView;
