import { BottomTab } from '@components/BottomTab';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import React from 'react';

import { DietStack } from './dietStack';
import { ProfileStack } from './profileStack';

export type AppStackParamsList = {
  DietStack: undefined;
  ProfileStack: undefined;
  MealDetails: undefined;
};

const App = createBottomTabNavigator<AppStackParamsList>();

export const AppStack = () => {
  return (
    <>
      <App.Navigator
        tabBar={props => <BottomTab {...props} />}
        screenOptions={{ headerShown: false }}>
        <App.Screen name="DietStack" component={DietStack} />
        <App.Screen name="ProfileStack" component={ProfileStack} />
      </App.Navigator>
    </>
  );
};

export type NavPropsApp = BottomTabNavigationProp<AppStackParamsList>;
