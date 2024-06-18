import {StyleSheet, View} from 'react-native';
import React from 'react';
import Application from './src/navigation/Application';

const App = () => {
  return (
    <View style={styles.app}>
      <Application />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
