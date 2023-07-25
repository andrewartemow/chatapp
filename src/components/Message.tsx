import { FC } from 'react';
import './Message.css';

interface MessageProps {
  message: any;
}

export const Message: FC<MessageProps> = ({ message }) => {
  return (
    <div className="message">
      <div>
        <img src={message.avatar} />
        <span>{message.name}: </span>
      </div>
      <p>{message.text}</p>
    </div>
  );
};
