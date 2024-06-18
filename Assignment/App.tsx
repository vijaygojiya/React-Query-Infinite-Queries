import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Application from './src/navigation/Application';
import {AuthProvider} from './src/context';
import {Auth} from './src/services/firebase';

const App = () => {
  useEffect(() => {
    Auth.configureGoogleSignIn();
  });
  return (
    <View style={styles.app}>
      <AuthProvider>
        <Application />
      </AuthProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
