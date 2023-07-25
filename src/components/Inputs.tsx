import { FC } from 'react';
import './Inputs.css';

interface InputProps {
  placeholder?: string;
  inputRef?: null | React.LegacyRef<HTMLInputElement>;
  value?: string;
  onChange?: (e: any) => void;
}

export const RoomInput: FC<InputProps> = ({ placeholder, inputRef }) => {
  return (
    <input ref={inputRef} className="input__room" placeholder={placeholder} />
  );
};

export const ChatInput: FC<InputProps> = ({ value, placeholder, onChange }) => {
  return (
    <input
      className="input__chat"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
