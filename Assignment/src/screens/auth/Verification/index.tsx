import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {RootStackScreensProps} from '../../../types/navigation';
import {AppButton} from '../../../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useTheme} from '@react-navigation/native';

const Verification = ({route}: RootStackScreensProps<'Verification'>) => {
  const [code, setCode] = useState('');
  const {colors} = useTheme();
  const verifyCode = (otp: string) => {
    const credential = auth.PhoneAuthProvider.credential(
      route.params.verificationId,
      otp,
    );
    const multiFactorAssertion =
      auth.PhoneMultiFactorGenerator.assertion(credential);
    route.params.resolver
      .resolveSignIn(multiFactorAssertion)
      .then(userCredential => {
        // additionally onAuthStateChanged will be triggered as well
      });
  };
  return (
    <View style={styles.container}>
      <OTPInputView
        pinCount={6}
        style={styles.inputContainer}
        code={code}
        autoFocusOnLoad={false}
        onCodeChanged={setCode}
        codeInputFieldStyle={{
          ...styles.underlineStyleBase,
          color: colors.primary,
        }}
        codeInputHighlightStyle={{borderColor: colors.primary}}
        onCodeFilled={otp => {
          verifyCode(otp);
        }}
      />
      <AppButton
        disabled={code.length !== 6}
        onPress={() => {
          verifyCode(code);
        }}
        title={'Verify'}
      />
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 22,
  },
  underlineStyleBase: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
  },
  inputContainer: {height: 220},
});
