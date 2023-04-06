import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { AddMeal } from '@screens/AddMeal';
import { ChoseFoodToAddInMeal } from '@screens/ChoseFoodToAddInMeal';
import { DetailsMealsDay } from '@screens/DetailsMealsDay';
import { EditMeal } from '@screens/EditMeal';
import { UpdateFoodInMeal } from '@screens/UpdateFoodInMeal';
import { IFood } from '@services/firebase/models/food';
import { IMeal } from '@services/firebase/models/meal';
import { Favorites } from '@screens/Favorites';
import { Goal } from '@screens/Goal';
import { Help } from '@screens/Help';
import { History } from '@screens/History';
import { Info } from '@screens/Info';
import { Notifications } from '@screens/Notifications';
import { useUserStore } from '@stores/user';
import { useTheme } from 'styled-components/native';
import { AppStack } from './app';
import { CreateUserStack } from './createUserStack';
import { GoalResult } from '@screens/GoalResul';
import { AddFood } from '@screens/AddFood';

export type LoggedStackParamsList = {
  CreateUser: undefined;
  App: undefined;
  DetailsMealsDay: undefined;
  ChoseFoodToAddInMeal: { meal: IMeal };
  UpdateFoodInMeal: { type: 'add' | 'edit'; meal: IMeal; food: IFood };
  EditMeal: { meal?: IMeal; updatedMeal?: IMeal };
  AddMeal: undefined;
  Favorites: undefined;
  Goal: undefined;
  Help: undefined;
  History: undefined;
  Info: undefined;
  Notifications: undefined;
  GoalResult: undefined;
  AddFood: undefined;
};

const Logged = createNativeStackNavigator<LoggedStackParamsList>();

export const LoggedStack = () => {
  const { user } = useUserStore();
  const { colors } = useTheme();

  return (
    <Logged.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.dark },
      }}>
      {!user?.info ? (
        <Logged.Screen name="CreateUser" component={CreateUserStack} />
      ) : (
        <Logged.Screen name="App" component={AppStack} />
      )}
      <Logged.Screen name="DetailsMealsDay" component={DetailsMealsDay} />
      <Logged.Screen name="UpdateFoodInMeal" component={UpdateFoodInMeal} />
      <Logged.Screen
        name="ChoseFoodToAddInMeal"
        component={ChoseFoodToAddInMeal}
      />
      <Logged.Screen name="EditMeal" component={EditMeal} />
      <Logged.Screen name="AddMeal" component={AddMeal} />
      <Logged.Screen name="Favorites" component={Favorites} />
      <Logged.Screen name="Goal" component={Goal} />
      <Logged.Screen name="Help" component={Help} />
      <Logged.Screen name="History" component={History} />
      <Logged.Screen name="Info" component={Info} />
      <Logged.Screen name="Notifications" component={Notifications} />
      <Logged.Screen name="GoalResult" component={GoalResult} />
      <Logged.Screen name="AddFood" component={AddFood} />
    </Logged.Navigator>
  );
};

export type NavPropsLogged = NativeStackNavigationProp<LoggedStackParamsList>;
