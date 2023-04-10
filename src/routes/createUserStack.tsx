import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import { TopTabCreateUser } from '@components/index';
import {
  ActivityCreateUser,
  BirthDateCreateUser,
  ConclusionCreateUser,
  GenderCreateUser,
  GoalCreateUser,
  HeightCreateUser,
  IntroductionCreateUser,
  WeightCreateUser,
} from '@screens/index';

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
  const renderTopTab = (props: MaterialTopTabBarProps) => {
    return <TopTabCreateUser {...props} />;
  };

  return (
    <CreateUser.Navigator
      tabBar={props => renderTopTab(props)}
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
