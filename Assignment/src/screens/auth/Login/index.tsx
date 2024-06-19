import React, {useState} from 'react';
import {View} from 'react-native';
import {RootStackScreensProps} from '../../../types/navigation';
import {AppButton, AppTextInput} from '../../../components';
import styles from './styles';
import {Auth} from '../../../services';
import {useTheme} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import fireAuth from '../../../services/fireAuth';
import auth from '@react-native-firebase/auth';
import Routes from '../../../navigation/routes';

const defaultValue = {
  email: '',
  password: '',
};
type inputKeys = keyof typeof defaultValue;

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const Login = ({navigation}: RootStackScreensProps<'Login'>) => {
  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  const {mutate: loginWithEmailPassword, isPending} = useMutation({
    mutationFn: fireAuth.signInUserWithFirebase,
    onSuccess: data => {
      // fireAuth.fireAuth.currentUser?.sendEmailVerification();
      // console.log('========++====++===', JSON.stringify(data, null, 9));
    },
    onError: async error => {
      const {code = null} = error;
      if (code === 'auth/multi-factor-auth-required') {
        const resolver = auth.getMultiFactorResolver(fireAuth.fireAuth, error);
        console.log('=========', JSON.stringify(resolver, null, 9));
        if (
          resolver?.hints[0].factorId ===
          auth.PhoneMultiFactorGenerator.FACTOR_ID
        ) {
          const hint = resolver.hints[0];
          const sessionId = resolver.session;

          const verificationId =
            await fireAuth.fireAuth.verifyPhoneNumberWithMultiFactorInfo(
              hint,
              sessionId,
            );

          navigation.navigate(Routes.Verification, {verificationId, resolver});
        }
      }
    },
  });
  const {colors} = useTheme();

  const handleLogin = () => {
    loginWithEmailPassword({...inputs});
  };
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
      {inputConfigs.map(item => {
        return (
          <AppTextInput
            label={item}
            value={inputs[item]}
            onChangeText={text => {
              setInputs(prev => ({...prev, [item]: text}));
            }}
          />
        );
      })}
      <AppButton
        title="Login"
        onPress={handleLogin}
        containerStyle={{backgroundColor: colors.primary}}
        titleStyle={{color: colors.background}}
        isLoading={isPending}
      />

      <AppButton title="SignIn With Google" onPress={handleSignInWithGoogle} />
    </View>
  );
};

export default Login;
