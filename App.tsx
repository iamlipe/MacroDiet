import React, { useCallback } from 'react';
import { Routes } from '@/core/presentation/routes';
import { useFonts } from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from '@/core/presentation/contexts/ToastContext';
import { LoaderProvider } from '@/core/presentation/contexts/LoaderContext';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/config/styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { I18nextProvider } from 'react-i18next';
import { i18next } from '@/config/i18n';
import '@/config/googleSignin';

preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    'Ubuntu-Regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
    icomoon: require('./assets/fonts/icomoon.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18next}>
            <BottomSheetModalProvider>
              <LoaderProvider>
                <ToastProvider>
                  <StatusBar
                    barStyle="light-content"
                    animated={false}
                    backgroundColor={theme.colors.black}
                  />
                  <Routes />
                </ToastProvider>
              </LoaderProvider>
            </BottomSheetModalProvider>
          </I18nextProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
