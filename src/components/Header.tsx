import { FC, useEffect, useState } from 'react';
import './Header.css';

import { SignOutButton } from './Buttons';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface HeaderProps {
  setIsAuth: (value: boolean) => void;
  setRoomId: (value: string) => void;
}

export const Header: FC<HeaderProps> = ({ setIsAuth, setRoomId }) => {
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setDisplayWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const avatar = localStorage.getItem('user-avatar');
  const name = localStorage.getItem('user-name');

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('user_uid');
    localStorage.removeItem('user-avatar');
    localStorage.removeItem('user-name');
    setIsAuth(false);
    setRoomId('');
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-content__details">
          {avatar && (
            <img className="header-avatar" src={avatar} alt="avatar" />
          )}
          <h4>
            Hi {name}!{displayWidth > 900 && ', Nice to see you again'}
          </h4>
        </div>
        <SignOutButton onClick={signUserOut} />
      </div>
    </div>
  );
};
