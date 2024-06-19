import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {RootStackScreensProps} from '../../../types/navigation';
import {AppButton, AppTextInput} from '../../../components';

const Verification = ({route}: RootStackScreensProps<'Verification'>) => {
  const [code, setCode] = useState('');
  const verifyCode = () => {
    const credential = auth.PhoneAuthProvider.credential(
      route.params.verificationId,
      code,
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
    <View>
      <AppTextInput value={code} onChangeText={setCode} label={'OPT'} />
      <AppButton onPress={verifyCode} title={'Verify'} />
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({});
