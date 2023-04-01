import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Login } from '@screens/Login';
import { LoginWithEmail } from '@screens/LoginWithEmail';
import { Onboarding } from '@screens/Onboarding';
import { Register } from '@screens/Register';
import { Sync } from '@screens/Sync';
import { useSyncStore } from '@stores/sync';
import React from 'react';
import { useTheme } from 'styled-components/native';

export type AuthStackParamsList = {
  Onboarding: undefined;
  Sync: undefined;
  Login: undefined;
  Register: undefined;
  LoginWithEmail: undefined;
};

const Auth = createNativeStackNavigator<AuthStackParamsList>();

export const AuthStack = () => {
  const { isSync } = useSyncStore();
  const { colors } = useTheme();

  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.dark },
      }}>
      {(isSync === null || isSync) && (
        <Auth.Screen name="Sync" component={Sync} />
      )}
      <Auth.Screen name="Onboarding" component={Onboarding} />
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="Register" component={Register} />
      <Auth.Screen name="LoginWithEmail" component={LoginWithEmail} />
    </Auth.Navigator>
  );
};

export type NavPropsAuth = NativeStackNavigationProp<AuthStackParamsList>;
