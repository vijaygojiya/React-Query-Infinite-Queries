import React, {useCallback, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {RootStackScreensProps} from '../../../types/navigation';
import {AppButton, AppTextInput} from '../../../components';
import styles from './styles';
import {Auth} from '../../../services';
import {useTheme} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import fireAuth from '../../../services/fireAuth';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Routes from '../../../navigation/routes';
import {EyeClosed, EyeOpen} from '../../../assets';
import {loginSchema} from '../../../utils/validation';
import {ZodError} from 'zod';
import {zodErrorSimplify} from '../../../utils/helper';
import {isErrorWithCode} from '@react-native-google-signin/google-signin';
import {useNotifications} from '../../../../App';

const defaultValue = {
  email: '',
  password: '',
};
type inputKeys = keyof typeof defaultValue;

const config = {
  email: {
    label: 'Email',
    placeholder: 'Enter you email address',
    keyboardType: 'email-address' as const,
    returnKeyType: 'next' as const,
  },
  password: {
    label: 'Password',
    placeholder: 'Enter your password',
    returnKeyType: 'done' as const,
  },
};

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const Login = ({navigation}: RootStackScreensProps<'Login'>) => {
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);

  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);
  const {colors} = useTheme();

  const {notify} = useNotifications();

  const inputRefs = useRef<Record<inputKeys, null | TextInput>>({
    email: null,
    password: null,
  });

  const {mutate: signInWithGoogle, isPending: isLoading} = useMutation({
    mutationFn: Auth.googleSignIn,
    onSuccess: data => {
      handleLoginSuccess(data);
    },
    onError: async error => {
      handleSignInError(error);
    },
  });

  const {mutate: loginWithEmailPassword, isPending} = useMutation({
    mutationFn: fireAuth.signInUserWithFirebase,
    onSuccess: data => {
      handleLoginSuccess(data);
    },
    onError: async error => {
      handleSignInError(error);
    },
  });

  const handleLoginSuccess = (_d: FirebaseAuthTypes.UserCredential) => {
    notify('success', {
      params: {description: 'Login successfully!', title: 'Login Success'},
    });
  };

  const handleSignInError = async (error: unknown) => {
    if (isErrorWithCode(error)) {
      const {code} = error;
      if (code === 'auth/multi-factor-auth-required') {
        notify('error', {
          params: {
            description: '2FA Required',
            title:
              'Please complete a second factor challenge to finish signing into this account.',
          },
        });
        const resolver = auth.getMultiFactorResolver(fireAuth.fireAuth, error);

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
    } else {
      notify('error', {
        params: {
          description: '',
          title: 'Something went wrong please try after some time!',
        },
      });
    }
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };

  const handleSubmitEditing = (key: inputKeys) => {
    if (key === 'email') {
      inputRefs.current.password?.focus();
    } else {
      handleOnSubmit();
    }
  };

  const handleRightIconPress = useCallback((key: inputKeys) => {
    if (key === 'password') {
      setSecureTextEntry(v => !v);
    }
  }, []);

  const handleOnSubmit = async () => {
    setErrors(defaultValue);

    try {
      loginSchema.parse(inputs);
      loginWithEmailPassword({...inputs});
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = zodErrorSimplify<typeof defaultValue>(error);
        setErrors(validationErrors);
      }
    }
  };
  return (
    <View style={styles.container}>
      {inputConfigs.map(item => {
        const data = config[item];
        return (
          <AppTextInput
            key={item}
            ref={ref => {
              const temp = inputRefs.current;
              inputRefs.current = {...temp, [item]: ref};
            }}
            value={inputs[item]}
            onChangeText={text => {
              setInputs(prev => ({...prev, [item]: text}));
              setErrors(prev => ({...prev, [item]: ''}));
            }}
            secureTextEntry={
              item === 'password' ? isSecureTextEntry : undefined
            }
            error={errors[item]}
            onRightIconPress={() => {
              handleRightIconPress(item);
            }}
            rightIcon={
              item === 'password' ? (
                isSecureTextEntry ? (
                  <EyeClosed />
                ) : (
                  <EyeOpen />
                )
              ) : null
            }
            onSubmitEditing={() => {
              handleSubmitEditing(item);
            }}
            {...data}
          />
        );
      })}
      <AppButton
        title="Login"
        onPress={handleOnSubmit}
        containerStyle={{...styles.loginBtn, backgroundColor: colors.primary}}
        titleStyle={{color: colors.background}}
        isLoading={isPending}
      />

      <AppButton
        title="SignIn With Google"
        onPress={handleSignInWithGoogle}
        isLoading={isLoading}
      />
    </View>
  );
};

export default Login;
