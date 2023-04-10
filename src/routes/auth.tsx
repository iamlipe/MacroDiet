import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { useSyncStore } from '@stores/index';
import {
  RecoveryPassword,
  Login,
  LoginWithEmail,
  Onboarding,
  Register,
  Sync,
} from '@screens/index';

export type AuthStackParamsList = {
  Onboarding: undefined;
  Sync: undefined;
  Login: undefined;
  Register: undefined;
  LoginWithEmail: undefined;
  RecoveryPassword: undefined;
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
      <Auth.Screen name="RecoveryPassword" component={RecoveryPassword} />
    </Auth.Navigator>
  );
};

export type NavPropsAuth = NativeStackNavigationProp<AuthStackParamsList>;
