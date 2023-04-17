import React, { useCallback, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import editMealSchema, {
  EditMealForm,
} from '@core/infrastructure/validators/editMealSchema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Formik } from 'formik';
import { MealProps } from '@core/domain/models/Meal';
import { NavPropsLogged } from '@core/presentation/routes/logged';
import { NavPropsDiet } from '@core/presentation/routes/diet';
import { useFood } from '@core/infrastructure/hooks/useFood';
import { useMeals } from '@core/infrastructure/hooks/useMeals';
import { handleFoodsInMeal } from '@utils/helpers/handleMeal';
import Loading from '@core/presentation/shared/Loading';
import Background from '@core/presentation/shared/Background';
import DatePicker from '@core/presentation/shared/DatePicker';
import Button from '@core/presentation/shared/Button';
import BottomSheet from '@core/presentation/shared/BottomSheet';
import {
  StyledForm,
  StyledInput,
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledCardFood,
  StyledTitleSection,
  StyledContainerFoods,
  StyledLinkBottomSheet,
  StyledButtonExcludeMeal,
} from './styles';
import { formatDate } from '@utils/helpers/format';

type StackParamsList = {
  MealData: {
    meal: MealProps;
  };
  UpdatedMealData: {
    updatedMeal: MealProps;
  };
};

const EditMeal = () => {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { params: paramsUpdatedMeal } =
    useRoute<RouteProp<StackParamsList, 'UpdatedMealData'>>();
  const [dataMeal, setDataMeal] = useState<MealProps | null>(null);
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { navigate: navigateDiet } = useNavigation<NavPropsDiet>();
  const { infoFood, handleFood } = useFood();
  const { updateMeal, removeMeal } = useMeals();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const food = useMemo(() => {
    if (selectedFood) {
      return infoFood(selectedFood);
    }

    return null;
  }, [infoFood, selectedFood]);

  const onPressExclude = useCallback(() => {
    if (food && dataMeal) {
      const foodsInMeal = handleFoodsInMeal('remove', dataMeal, food);

      if (foodsInMeal) {
        setDataMeal({ ...dataMeal, foods: foodsInMeal });
      }
    }

    bottomSheetRef.current?.close();
  }, [dataMeal, food]);

  const onPressEdit = useCallback(() => {
    if (food && dataMeal) {
      navigateLogged('UpdateFoodInMeal', {
        type: 'edit',
        food,
        meal: dataMeal,
      });
    }

    bottomSheetRef.current?.close();
  }, [dataMeal, food, navigateLogged]);

  const initialValuesForm = {
    title: dataMeal?.title || '',
    mealTime: dataMeal?.time.milliseconds
      ? moment(new Date(dataMeal?.time.milliseconds)).format()
      : '',
  };

  const onSubmit = async (values: EditMealForm) => {
    if (dataMeal?.doc) {
      await updateMeal({
        ...dataMeal,
        title: values.title,
        time: formatDate(values.mealTime),
      });
    }

    navigateDiet('HomeDiet');
  };

  useFocusEffect(
    useCallback(() => {
      setDataMeal(paramsUpdatedMeal.updatedMeal || paramsMeal.meal);
    }, [paramsMeal.meal, paramsUpdatedMeal.updatedMeal]),
  );

  if (!dataMeal) {
    return <Loading />;
  }

  return (
    <>
      <Background>
        <Formik
          initialValues={initialValuesForm}
          validationSchema={toFormikValidationSchema(editMealSchema)}
          onSubmit={onSubmit}>
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <>
              <StyledScroll insets={insets}>
                <StyledForm>
                  <StyledInput
                    label="Nome"
                    value={values.title}
                    onChangeText={handleChange('name')}
                    error={touched.title && errors.title ? errors.title : ''}
                  />

                  <DatePicker
                    label="Horario da refeição"
                    mode="time"
                    onChange={handleChange('mealTime')}
                    value={values.mealTime}
                    error={
                      touched.mealTime && errors.mealTime ? errors.mealTime : ''
                    }
                  />
                </StyledForm>

                <StyledContainerFoods>
                  <StyledTitleSection>Comidas</StyledTitleSection>

                  {dataMeal?.foods.map(item => (
                    <StyledCardFood
                      key={item.foodDoc}
                      title={handleFood(item).title}
                      description={`${handleFood(item).kcal}kcal`}
                      subtitle={`${handleFood(item).quantity}g`}
                      type="bottomLine"
                      onPress={() => {
                        bottomSheetRef.current?.present();
                        setSelectedFood(item.foodDoc);
                      }}
                    />
                  ))}
                </StyledContainerFoods>
              </StyledScroll>

              <StyledWrapperButtonSubmit insets={insets}>
                <StyledButtonExcludeMeal
                  title="Excluir"
                  type="outlined"
                  onPress={async () => {
                    await removeMeal(dataMeal.doc);
                    navigateDiet('HomeDiet');
                  }}
                />
                <Button title="Editar" onPress={handleSubmit} />
              </StyledWrapperButtonSubmit>
            </>
          )}
        </Formik>
      </Background>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['20%']}
        close={() => bottomSheetRef.current?.close()}>
        <StyledLinkBottomSheet title={'Editar'} onPress={onPressEdit} />
        <StyledLinkBottomSheet title={'Excluir'} onPress={onPressExclude} />
      </BottomSheet>
    </>
  );
};

export default EditMeal;
