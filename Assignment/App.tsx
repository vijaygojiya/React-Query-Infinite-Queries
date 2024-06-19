import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Application from './src/navigation/Application';
import {AuthProvider} from './src/context';
import {Auth} from './src/services';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    Auth.configureGoogleSignIn();
  });
  return (
    <GestureHandlerRootView style={styles.app}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Application />
          </AuthProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
