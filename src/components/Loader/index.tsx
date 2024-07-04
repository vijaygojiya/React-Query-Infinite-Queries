import {ActivityIndicator, Modal, StyleSheet} from 'react-native';
import React from 'react';

const Loader = ({isLoading = false}) => {
  return (
    <Modal visible={isLoading} transparent={true}>
      <ActivityIndicator style={styles.container} size="large" />
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {backgroundColor: '#00000033', flex: 1},
});
