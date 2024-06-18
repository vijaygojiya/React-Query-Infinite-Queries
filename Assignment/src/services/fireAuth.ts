import auth from '@react-native-firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '../constant';

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: false,
    profileImageSize: 150,
  });
};

const fireAuth = auth();

const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return await fireAuth.signInWithCredential(googleCredential);
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  return fireAuth.signOut();
};

export default {
  configureGoogleSignIn,
  googleSignIn,
  fireAuth,
  signOut,
};
