import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Auth} from '../services';

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  logOut: () => void;
}>({
  isLoggedIn: false,
  logOut: () => {},
});

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(false);
  console.log('==========', Auth.fireAuth.onAuthStateChanged);
  useEffect(() => {
    const subscriber = Auth.fireAuth.onAuthStateChanged(user => {
      setLoggedIn(!!user?.email);
    });
    return subscriber;
  }, [setLoggedIn]);

  const logOut = useCallback(async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error while sign in outing...');
    }
  }, []);

  const value = useMemo(() => {
    return {isLoggedIn: Boolean(isLoggedIn), logOut};
  }, [isLoggedIn, logOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
