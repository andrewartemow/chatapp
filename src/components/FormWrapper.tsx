import { FC } from 'react';
import './FormWrapper.css';

interface FormWrapperProps {
  children: React.ReactNode;
}

export const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return <div className="form-wrapper">{children}</div>;
};
