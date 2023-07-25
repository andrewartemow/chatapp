import { FC } from 'react';
import { Message } from './Message';

import './MessagesCollection.css';

interface MessagesCollectionProps {
  messages: any;
}

export const MessagesCollection: FC<MessagesCollectionProps> = ({
  messages,
}) => {
  return (
    <div className="messages__collection">
      {messages.map((message: any, index: number) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};
