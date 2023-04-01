import { TopTabCreateUser } from '@components/TopTabCreateUser';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import { ActivityCreateUser } from '@screens/ActivityCreateUser';
import { BirthDateCreateUser } from '@screens/BirthDateCreateUser';
import { ConclusionCreateUser } from '@screens/ConclusionCreateUser';
import { GenderCreateUser } from '@screens/GenderCreateUser';
import { GoalCreateUser } from '@screens/GoalCreateUser';
import { HeightCreateUser } from '@screens/HeightCreateUser';
import { IntroductionCreateUser } from '@screens/IntroductionCreateUser';
import { WeightCreateUser } from '@screens/WeightCreateUser';
import React from 'react';

export type CreateUserStackParamsList = {
  IntroductionCreateUser: undefined;
  GoalCreateUser: undefined;
  ActivityCreateUser: undefined;
  GenderCreateUser: undefined;
  BirthDateCreateUser: undefined;
  HeightCreateUser: undefined;
  ConclusionCreateUser: undefined;
  WeightCreateUser: undefined;
};

const CreateUser = createMaterialTopTabNavigator<CreateUserStackParamsList>();

export const CreateUserStack = () => {
  return (
    <CreateUser.Navigator
      tabBar={props => <TopTabCreateUser {...props} />}
      screenOptions={{ swipeEnabled: false }}>
      <CreateUser.Screen
        name="IntroductionCreateUser"
        component={IntroductionCreateUser}
      />
      <CreateUser.Screen name="GoalCreateUser" component={GoalCreateUser} />
      <CreateUser.Screen
        name="ActivityCreateUser"
        component={ActivityCreateUser}
      />
      <CreateUser.Screen
        name="BirthDateCreateUser"
        component={BirthDateCreateUser}
      />
      <CreateUser.Screen name="GenderCreateUser" component={GenderCreateUser} />
      <CreateUser.Screen name="HeightCreateUser" component={HeightCreateUser} />
      <CreateUser.Screen name="WeightCreateUser" component={WeightCreateUser} />
      <CreateUser.Screen
        name="ConclusionCreateUser"
        component={ConclusionCreateUser}
      />
    </CreateUser.Navigator>
  );
};

export type NavPropsCreateUser =
  MaterialTopTabNavigationProp<CreateUserStackParamsList>;
