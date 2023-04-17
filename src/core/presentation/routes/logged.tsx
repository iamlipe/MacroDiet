import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useUserStore } from '@core/infrastructure/store/userStore';
import { MealProps } from '@core/domain/models/Meal';
import { FoodProps } from '@core/domain/models/Food';
import { AppStack } from './app';
import { CreateUserStack } from './createUser';
import ChoseFoodToAddInMeal from '@core/presentation/screens/ChoseFoodToAddInMeal';
import UpdateFoodInMeal from '@core/presentation/screens/UpdateFoodInMeal';
import EditMeal from '@core/presentation/screens/EditMeal';
import Header from '@core/presentation/shared/Header';
import DetailsMealsDay from '@core/presentation/screens/DetailsMealsDay';
import AddMeal from '@core/presentation/screens/AddMeal';
import AddFood from '@core/presentation/screens/AddFood';

export type LoggedStackParamsList = {
  CreateUser: undefined;
  App: undefined;
  ChoseFoodToAddInMeal: { meal: MealProps };
  UpdateFoodInMeal: { type: 'add' | 'edit'; meal: MealProps; food: FoodProps };
  EditMeal: { meal?: MealProps; updatedMeal?: MealProps };
  DetailsMealsDay: undefined;
  AddMeal: undefined;
  AddFood: undefined;
};

const Logged = createNativeStackNavigator<LoggedStackParamsList>();

export const LoggedStack = () => {
  const { user } = useUserStore();

  const renderHeader = (props: NativeStackHeaderProps) => {
    return <Header {...props} />;
  };

  return (
    <Logged.Navigator
      screenOptions={{
        headerShown: true,
        header: renderHeader,
      }}>
      {!user?.info ? (
        <Logged.Screen
          name="CreateUser"
          component={CreateUserStack}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Logged.Screen
            name="App"
            component={AppStack}
            options={{ headerShown: false }}
          />
          <Logged.Screen
            name="ChoseFoodToAddInMeal"
            component={ChoseFoodToAddInMeal}
          />
          <Logged.Screen name="UpdateFoodInMeal" component={UpdateFoodInMeal} />
          <Logged.Screen name="EditMeal" component={EditMeal} />
          <Logged.Screen name="DetailsMealsDay" component={DetailsMealsDay} />
          <Logged.Screen name="AddMeal" component={AddMeal} />
          <Logged.Screen name="AddFood" component={AddFood} />
        </>
      )}
    </Logged.Navigator>
  );
};

export type NavPropsLogged = NativeStackNavigationProp<LoggedStackParamsList>;
