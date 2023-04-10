import React, { useCallback, useRef, useState } from 'react';
import moment from 'moment';
import * as Yup from 'yup';
import { IMeal } from '@services/firebase/models/meal';
import { NavPropsLogged } from '@routes/logged';
import { NavPropsDiet } from '@routes/dietStack';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMeals, useFoods } from '@hooks/index';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Formik } from 'formik';
import {
  Background,
  Button,
  DatePicker,
  Header,
  BottomSheet,
  Loading,
} from '@components/index';
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

interface IEditMealForm {
  name: string;
  mealTime: string;
}

type StackParamsList = {
  MealData: {
    meal: IMeal;
  };
  UpdatedMealData: {
    updatedMeal: IMeal;
  };
};

const EditMeal = () => {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const { params: paramsMeal } =
    useRoute<RouteProp<StackParamsList, 'MealData'>>();
  const { params: paramsUpdatedMeal } =
    useRoute<RouteProp<StackParamsList, 'UpdatedMealData'>>();
  const [dataMeal, setDataMeal] = useState<IMeal | null>(null);
  const { navigate: navigateLogged } = useNavigation<NavPropsLogged>();
  const { goBack, navigate: navigateDiet } = useNavigation<NavPropsDiet>();
  const { getFood, handleFood } = useFoods();
  const { updateMeal, handleFoodsInMeal, removeMeal } = useMeals();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useFocusEffect(
    useCallback(() => {
      setDataMeal(paramsUpdatedMeal.updatedMeal || paramsMeal.meal);
    }, [paramsMeal.meal, paramsUpdatedMeal.updatedMeal]),
  );

  const onPressExclude = useCallback(() => {
    if (selectedFood) {
      const foodsInMeal = handleFoodsInMeal({
        type: 'remove',
        meal: dataMeal,
        food: getFood(selectedFood),
      });

      setDataMeal({ ...dataMeal, foods: foodsInMeal });
    }

    bottomSheetRef.current.close();
  }, [dataMeal, getFood, handleFoodsInMeal, selectedFood]);

  const onPressEdit = useCallback(() => {
    if (selectedFood) {
      navigateLogged('UpdateFoodInMeal', {
        type: 'edit',
        food: getFood(selectedFood),
        meal: dataMeal,
      });
    }

    bottomSheetRef.current.close();
  }, [dataMeal, getFood, navigateLogged, selectedFood]);

  const onPressSubmit = useCallback(
    async (values: IEditMealForm) => {
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
    },
    [dataMeal?.doc, dataMeal?.foods, updateMeal],
  );

  const initialValues: IEditMealForm = {
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
    <>
      <Background>
        <Header
          left={{ iconName: 'arrow-left', press: goBack }}
          title="Editar"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={editMealSchema}
          onSubmit={onPressSubmit}>
          {({ handleChange, values, handleSubmit, errors, touched }) => (
            <>
              <StyledScroll>
                <StyledForm>
                  <StyledInput
                    label="Nome"
                    name="name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    error={touched.name && errors.name ? errors.name : ''}
                  />

                  <DatePicker
                    name="mealTime"
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

                  {dataMeal?.foods.map(food => (
                    <StyledCardFood
                      title={handleFood(food).title}
                      description={handleFood(food).kcal}
                      subtitle={handleFood(food).quantity}
                      type="bottomLine"
                      onPress={() => {
                        bottomSheetRef.current.present();
                        setSelectedFood(food.foodDoc);
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
        close={() => bottomSheetRef.current.close()}>
        <StyledLinkBottomSheet title={'Editar'} onPress={onPressEdit} />
        <StyledLinkBottomSheet title={'Excluir'} onPress={onPressExclude} />
      </BottomSheet>
    </>
  );
};

export default EditMeal;
