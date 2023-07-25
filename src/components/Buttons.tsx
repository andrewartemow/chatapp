import { FC, ReactNode } from 'react';
import './Buttons.css';

interface ButtonProps {
  children?: ReactNode;
  rightRounded?: boolean;
  onClick?: () => void;
}

export const DefaultButton: FC<ButtonProps> = ({
  children,
  rightRounded,
  onClick,
}) => {
  return (
    <button
      className={`${
        rightRounded ? 'button__default__rightSideRounded' : 'button__default'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SignOutButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="button__signout" onClick={onClick}>
      Sign out
    </button>
  );
};

export const LeaveRoomButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="button__leaveroom" onClick={onClick}>
      Leave the Room
    </button>
  );
};

export const SubmitButton: FC<ButtonProps> = ({ children }) => {
  return (
    <button type="submit" className="button__submit">
      {children}
    </button>
  );
};
