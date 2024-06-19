import React from 'react';
import {View} from 'react-native';
import {RootStackScreensProps} from '../../../types/navigation';
import {AppButton} from '../../../components';
import styles from './styles';
import {Auth} from '../../../services';

const Login = ({}: RootStackScreensProps<'Login'>) => {
  const handleSignInWithGoogle = async () => {
    try {
      const data = await Auth.googleSignIn();
      console.log('sign in success!-', JSON.stringify(data, null, 9));
    } catch (error) {
      console.log('error while sign in with google', error);
    }
  };
  return (
    <View style={styles.container}>
      <AppButton title="SignIn With Google" onPress={handleSignInWithGoogle} />
    </View>
  );
};

export default Login;
