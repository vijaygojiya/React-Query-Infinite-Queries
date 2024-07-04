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
  try {
    const firebaseData = fireAuth.currentUser;

    if (firebaseData) {
      const provider = firebaseData.providerData[0]?.providerId;

      if (provider === 'google.com') {
        await GoogleSignin.revokeAccess();

        await GoogleSignin.signOut();
      }

      await fireAuth.signOut();
    }
  } catch (error) {
    throw error;
  }
};

const signInUserWithFirebase = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return fireAuth.signInWithEmailAndPassword(email, password);
};

export default {
  configureGoogleSignIn,
  googleSignIn,
  fireAuth,
  signOut,
  signInUserWithFirebase,
};
