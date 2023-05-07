import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { MealProps } from '@/core/domain/models/Meal';
import { FoodProps } from '@/core/domain/models/Food';
import { MealTimeProps } from '@/core/domain/models/MealTime';

import { useTheme } from 'styled-components/native';
import { useUserStore } from '@/core/infrastructure/store/userStore';

import { AppStack } from '@/core/presentation/routes/app';
import { HistoricStack } from '@/core/presentation/routes/historic';
import { CreateUserStack } from '@/core/presentation/routes/createUser';

import ChoseFoodToAddInMeal from '@/core/presentation/screens/ChoseFoodToAddInMeal';
import UpdateFoodInMeal from '@/core/presentation/screens/UpdateFoodInMeal';
import EditMeal from '@/core/presentation/screens/EditMeal';
import DetailsMealsDay from '@/core/presentation/screens/DetailsMealsDay';
import AddMeal from '@/core/presentation/screens/AddMeal';
import AddFood from '@/core/presentation/screens/AddFood';
import UserInfo from '@/core/presentation/screens/UserInfo';
import EditUserInfo from '@/core/presentation/screens/EditUserInfo';
import Goal from '@/core/presentation/screens/Goal';
import EditGoal from '@/core/presentation/screens/EditGoal';
import ResultGoal from '@/core/presentation/screens/ResultGoal';
import Favorites from '@/core/presentation/screens/Favorites';
import Routine from '@/core/presentation/screens/Routine';
import UpdateRoutine from '@/core/presentation/screens/UpdateRoutine';
import AddRoutine from '@/core/presentation/screens/AddRoutine';
import Help from '@/core/presentation/screens/Help';
import Settings from '@/core/presentation/screens/Settings';
import Notifications from '@/core/presentation/screens/Notifications';
import Header from '@/core/presentation/shared/Header';
import ChangePassword from '@/core/presentation/screens/ChangePassword';
import DrinkWater from '@/core/presentation/screens/DrinkWater';
import UpdateWeight from '@/core/presentation/screens/UpdateWeight';

export type LoggedStackParamsList = {
  CreateUser: undefined;
  App: undefined;
  ChoseFoodToAddInMeal: { meal: MealProps };
  UpdateFoodInMeal: { type: 'add' | 'edit'; meal: MealProps; food: FoodProps };
  EditMeal: { meal?: MealProps; updatedMeal?: MealProps };
  DetailsMealsDay: undefined;
  AddMeal: undefined;
  AddFood: undefined;
  UserInfo: undefined;
  EditUserInfo: undefined;
  Goal: undefined;
  EditGoal: undefined;
  ResultGoal: undefined;
  Favorites: undefined;
  Routine: undefined;
  UpdateRoutine: undefined;
  AddRoutine: { type: 'add' | 'edit'; routine?: MealTimeProps };
  HistoricStack: undefined;
  Help: undefined;
  Settings: undefined;
  Notifications: undefined;
  ChangePassword: undefined;
  DrinkWater: undefined;
  UpdateWeight: undefined;
};

const Logged = createNativeStackNavigator<LoggedStackParamsList>();

export const LoggedStack = () => {
  const { colors } = useTheme();
  const { user } = useUserStore();

  const renderHeader = (props: NativeStackHeaderProps) => {
    return <Header {...props} />;
  };
  return (
    <Logged.Navigator
      screenOptions={{
        headerShown: true,
        header: renderHeader,
        contentStyle: { backgroundColor: colors.background.dark },
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
            options={{ title: 'Adicionar alimento' }}
          />
          <Logged.Screen
            name="UpdateFoodInMeal"
            component={UpdateFoodInMeal}
            options={{ title: 'Adicionar alimento' }}
          />
          <Logged.Screen
            name="EditMeal"
            component={EditMeal}
            options={{ title: 'Editar refeição' }}
          />
          <Logged.Screen
            name="DetailsMealsDay"
            component={DetailsMealsDay}
            options={{ title: 'Editar refeição' }}
          />
          <Logged.Screen name="AddMeal" component={AddMeal} />
          <Logged.Screen name="AddFood" component={AddFood} />
          <Logged.Screen
            name="UserInfo"
            component={UserInfo}
            options={{ title: 'Detalhes' }}
          />
          <Logged.Screen
            name="EditUserInfo"
            component={EditUserInfo}
            options={{ title: 'Meus dados' }}
          />
          <Logged.Screen
            name="Goal"
            component={Goal}
            options={{ title: 'Objetivo' }}
          />
          <Logged.Screen
            name="EditGoal"
            component={EditGoal}
            options={{ title: 'Editar Objetivo' }}
          />
          <Logged.Screen
            name="ResultGoal"
            component={ResultGoal}
            options={{ title: 'Avaliação' }}
          />
          <Logged.Screen
            name="Favorites"
            component={Favorites}
            options={{ title: 'Comidas favoritas' }}
          />
          <Logged.Screen
            name="Routine"
            component={Routine}
            options={{ title: 'Rotina' }}
          />
          <Logged.Screen
            name="UpdateRoutine"
            component={UpdateRoutine}
            options={{ title: 'Rotina' }}
          />
          <Logged.Screen
            name="AddRoutine"
            component={AddRoutine}
            options={{ title: 'Rotina' }}
          />
          <Logged.Screen
            name="HistoricStack"
            component={HistoricStack}
            options={{ title: 'Historico' }}
          />
          <Logged.Screen
            name="Help"
            component={Help}
            options={{ title: 'Ajuda' }}
          />
          <Logged.Screen
            name="Settings"
            component={Settings}
            options={{ title: 'Configurações' }}
          />
          <Logged.Screen
            name="Notifications"
            component={Notifications}
            options={{ title: 'Notificações' }}
          />
          <Logged.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ title: 'Senha' }}
          />
          <Logged.Screen
            name="DrinkWater"
            component={DrinkWater}
            options={{ title: 'Água' }}
          />
          <Logged.Screen
            name="UpdateWeight"
            component={UpdateWeight}
            options={{ title: 'Atualizar peso' }}
          />
        </>
      )}
    </Logged.Navigator>
  );
};

export type NavPropsLogged = NativeStackNavigationProp<LoggedStackParamsList>;
