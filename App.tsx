import React, { useCallback } from 'react';
import { LoaderProvider } from '@context/LoaderContext';
import { ToastProvider } from '@context/ToastContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Routes } from '@routes/index';
import { theme } from '@styles/index';
import { useFonts } from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { I18nextProvider } from 'react-i18next';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { i18next } from '@i18n/index';
import '@config/googleSign';

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
            <LoaderProvider>
              <ToastProvider>
                <BottomSheetModalProvider>
                  <StatusBar
                    barStyle="light-content"
                    animated={false}
                    backgroundColor={theme.colors.background.dark}
                  />
                  <Routes />
                </BottomSheetModalProvider>
              </ToastProvider>
            </LoaderProvider>
          </I18nextProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
