import { FC, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './RoomSelect.css';
import { DefaultButton } from './Buttons';
import { RoomInput } from './Inputs';
import { FormWrapper } from './FormWrapper';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface RoomSelectProps {
  setRoomId: (value: string) => void;
}

export const RoomSelect: FC<RoomSelectProps> = ({ setRoomId }) => {
  const [roomNotExist, setRoomNotExist] = useState(false);

  const joinRoominputRef = useRef<null | any>(null);
  const createRoominputRef = useRef<null | any>(null);

  const joinRoom = async () => {
    const docs = await getDocs(collection(db, 'rooms'));
    const roomsIdsList: string[] = [];
    docs.forEach((doc) => roomsIdsList.push(doc.id));

    if (roomsIdsList.includes(joinRoominputRef.current.value)) {
      setRoomId(joinRoominputRef.current.value);
      localStorage.setItem('room_id', joinRoominputRef.current.value);
      setRoomNotExist(false);
    } else setRoomNotExist(true);
  };

  const createRoom = async () => {
    const uniqID = `Secretroom${uuid().slice(0, 15)}`;
    await setDoc(doc(db, 'rooms', uniqID), {
      roomName: createRoominputRef.current.value,
      adminOfRoom: {
        uid: cookies.get('user_uid'),
        name: localStorage.getItem('user-name'),
      },
    });
    setRoomId(uniqID);
    localStorage.setItem('room_id', uniqID);
  };

  return (
    <div className="room-select">
      <div className="room-select-content">
        <FormWrapper>
          <h2 className="room-select__title">Join Room</h2>
          <div className="room-select__groupforsearch">
            <RoomInput inputRef={joinRoominputRef} placeholder="room id" />
            <DefaultButton rightRounded onClick={joinRoom}>
              Join
            </DefaultButton>
            {roomNotExist && <p className="error">Room desn't exist</p>}
          </div>
        </FormWrapper>
        <FormWrapper>
          <h2 className="room-select__title">Create Room</h2>
          <div className="room-select__groupforsearch">
            <RoomInput inputRef={createRoominputRef} placeholder="room name" />
            <DefaultButton rightRounded onClick={createRoom}>
              Create
            </DefaultButton>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};
