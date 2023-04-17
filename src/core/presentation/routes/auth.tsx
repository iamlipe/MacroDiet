import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useSyncStore } from '@core/infrastructure/store/syncStore';
import Login from '@core/presentation/screens/Login';
import LoginWithEmail from '@core/presentation/screens/LoginWithEmail';
import Register from '@core/presentation/screens/Register';
import Onboarding from '@core/presentation/screens/Onboarding';
import Sync from '@core/presentation/screens/Sync';
import RecoveryPassword from '@core/presentation/screens/RecoveryPassword';
import Header from '@core/presentation/shared/Header';

export type AuthStackParamsList = {
  Sync: undefined;
  Onboarding: undefined;
  Login: undefined;
  LoginWithEmail: undefined;
  Register: undefined;
  RecoveryPassword: undefined;
};

const Auth = createNativeStackNavigator<AuthStackParamsList>();

export const AuthStack = () => {
  const { isSync } = useSyncStore();

  const renderHeader = (props: NativeStackHeaderProps) => {
    return <Header {...props} />;
  };

  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: true,
        header: renderHeader,
        animation: 'slide_from_bottom',
      }}>
      {(isSync === null || isSync) && (
        <Auth.Screen
          name="Sync"
          component={Sync}
          options={{ headerShown: false }}
        />
      )}
      <Auth.Screen name="Onboarding" component={Onboarding} />
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="LoginWithEmail" component={LoginWithEmail} />
      <Auth.Screen name="Register" component={Register} />
      <Auth.Screen name="RecoveryPassword" component={RecoveryPassword} />
    </Auth.Navigator>
  );
};

export type NavPropsAuth = NativeStackNavigationProp<AuthStackParamsList>;
