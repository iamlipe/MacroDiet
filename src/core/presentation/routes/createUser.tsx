import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import TabBarCreateUser from '@core/presentation/shared/TabBarCreateUser';
import IntroductionCreateUser from '@core/presentation/screens/IntroductionCreateUser';
import GenderCreateUser from '@core/presentation/screens/GenderCreateUser';
import BirthDateCreateUser from '@core/presentation/screens/BirthDateCreateUser';
import ActivityCreateUser from '@core/presentation/screens/ActivityCreateUser';
import WeightCreateUser from '@core/presentation/screens/WeightCreateUser';
import HeightCreateUser from '@core/presentation/screens/HeightCreateUser';
import TimeCreateUser from '@core/presentation/screens/TimeCreateUser';
import ConclusionCreateUser from '@core/presentation/screens/ConclusionCreateUser';

export type CreateUserStackParamsList = {
  IntroductionCreateUser: undefined;
  ActivityCreateUser: undefined;
  GenderCreateUser: undefined;
  BirthDateCreateUser: undefined;
  HeightCreateUser: undefined;
  ConclusionCreateUser: undefined;
  WeightCreateUser: undefined;
  TimeCreateUser: undefined;
};

const CreateUser = createMaterialTopTabNavigator<CreateUserStackParamsList>();

export const CreateUserStack = () => {
  const renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TabBarCreateUser {...props} />;
  };

  return (
    <CreateUser.Navigator
      tabBar={props => renderTabBar(props)}
      screenOptions={{ swipeEnabled: false }}>
      <CreateUser.Screen
        name="IntroductionCreateUser"
        component={IntroductionCreateUser}
      />
      <CreateUser.Screen name="GenderCreateUser" component={GenderCreateUser} />
      <CreateUser.Screen
        name="BirthDateCreateUser"
        component={BirthDateCreateUser}
      />
      <CreateUser.Screen
        name="ActivityCreateUser"
        component={ActivityCreateUser}
      />
      <CreateUser.Screen name="HeightCreateUser" component={HeightCreateUser} />
      <CreateUser.Screen name="WeightCreateUser" component={WeightCreateUser} />
      <CreateUser.Screen name="TimeCreateUser" component={TimeCreateUser} />
      <CreateUser.Screen
        name="ConclusionCreateUser"
        component={ConclusionCreateUser}
      />
    </CreateUser.Navigator>
  );
};

export type NavPropsCreateUser =
  MaterialTopTabNavigationProp<CreateUserStackParamsList>;
