import {useContext} from 'react';
import {AuthContext} from '../context/AuthProvider';
import {AUTH_CONTEXT_ERROR} from '../constant';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(AUTH_CONTEXT_ERROR);
  }

  return context;
}
