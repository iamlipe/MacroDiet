import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useUserStore } from '@stores/user';
import React from 'react';

import { AuthStack } from './auth';
import { LoggedStack } from './logged';

export type MainStackParamsList = {
  AuthStack: undefined;
  LoggedStack: undefined;
};

const Main = createNativeStackNavigator<MainStackParamsList>();

export const Routes = () => {
  const { user } = useUserStore();

  return (
    <NavigationContainer>
      <Main.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Main.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <Main.Screen name="LoggedStack" component={LoggedStack} />
        )}
      </Main.Navigator>
    </NavigationContainer>
  );
};

export type NavPropsMain = NativeStackNavigationProp<MainStackParamsList>;
