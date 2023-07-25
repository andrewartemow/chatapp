import { FC, FormEvent, useState, useEffect, useRef } from 'react';
import './Chat.css';

import {
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../config/firebase-config';
import { LeaveRoomButton, SubmitButton } from './Buttons';
import { ChatInput } from './Inputs';
import { MessagesCollection } from './MessagesCollection';

interface ChatProps {
  roomId: string;
  roomName: string;
  adminOfRoom: any;
  setRoomId: (value: string) => void;
}

export const Chat: FC<ChatProps> = ({
  roomId,
  roomName,
  adminOfRoom,
  setRoomId,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'rooms', roomId, 'messages'),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(q, (snapShot) => {
      const fetchedMessages: any = [];
      snapShot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data() });
      });

      setMessages(fetchedMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === '') return;

    if (auth.currentUser) {
      const { uid, displayName, photoURL } = auth.currentUser;

      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        text: newMessage,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });

      setNewMessage('');
    }
  };

  const leaveRoom = () => {
    setRoomId('');
    localStorage.removeItem('room_id');
  };

  return (
    <div className="chat">
      {<h2 className="chat__title">{roomName}</h2>}
      <h5 className="chat__title">Room ID: {roomId}</h5>
      <h5 className="chat__title">admin: {adminOfRoom.name}</h5>
      <MessagesCollection messages={messages} />
      <form className="chat__form" onSubmit={(e) => sendMessage(e)}>
        <ChatInput
          placeholder="enter message..."
          value={newMessage}
          onChange={(e: any) => setNewMessage(e.target.value)}
        />
        <SubmitButton>Send</SubmitButton>
      </form>
      <LeaveRoomButton onClick={leaveRoom} />
    </div>
  );
};
