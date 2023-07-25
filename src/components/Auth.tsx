import { FC } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../config/firebase-config';
import Cookies from 'universal-cookie';

import './Auth.css';
import { DefaultButton } from './Buttons';

const cookies = new Cookies();

interface AuthProps {
  setIsAuth: (value: boolean) => void;
}

export const Auth: FC<AuthProps> = ({ setIsAuth }) => {
  const signIn = async () => {
    const signInRequest = await signInWithPopup(auth, provider);
    cookies.set('user_uid', signInRequest.user.uid);
    localStorage.setItem('user-avatar', signInRequest.user.photoURL || '');
    localStorage.setItem('user-name', signInRequest.user.displayName || '');
    setIsAuth(true);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Use Google account to sign in</h2>
      <DefaultButton onClick={signIn}>Sign In with Google</DefaultButton>
    </div>
  );
};
