import { useState, useEffect } from 'react';
import './App.css';

import { auth, db } from './config/firebase-config';

import Cookies from 'universal-cookie';

import { Auth } from './components/Auth';
import { RoomSelect } from './components/RoomSelect';
import { Chat } from './components/Chat';
import { TopIcons } from './components/TopIcons';
import { Header } from './components/Header';
import { doc, getDoc } from 'firebase/firestore';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(cookies.get('user_uid'));
  const [roomId, setRoomId] = useState('');
  const [roomData, setRoomData] = useState<null | any>(null);
  const [roomIsLoadind, setRoomIsLoading] = useState<boolean>(false);

  const getRoomData = async () => {
    setRoomIsLoading(true);
    const data = await getDoc(doc(db, 'rooms', roomId)).then((data) =>
      data.data()
    );
    setRoomData(data);
    setRoomIsLoading(false);
  };

  useEffect(() => {
    console.log('render');
    const roomIdFromLocalStorage = localStorage.getItem('room_id')
      ? localStorage.getItem('room_id')
      : '';
    if (roomIdFromLocalStorage) {
      setRoomId(roomIdFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (roomId) {
      getRoomData();
    }
  }, [roomId]);

  if (!isAuth) {
    return (
      <div className="App">
        <TopIcons />
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  if (roomIsLoadind) {
    return (
      <div className="App">
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>LOADING...</h2>
        </div>
      </div>
    );
  }

  if (roomData && roomId) {
    const { roomName, adminOfRoom } = roomData;

    return (
      <div className="App">
        <Header setIsAuth={setIsAuth} setRoomId={setRoomId} />
        <Chat
          roomId={roomId}
          setRoomId={setRoomId}
          roomName={roomName}
          adminOfRoom={adminOfRoom}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Header setIsAuth={setIsAuth} setRoomId={setRoomId} />
      <RoomSelect setRoomId={setRoomId} />
    </div>
  );
}

export default App;
