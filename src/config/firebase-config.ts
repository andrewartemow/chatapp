import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCW5u7p_oiFnnqE5we9xpN3Ybe6AqaqWvU',
  authDomain: 'chatapp2-868c3.firebaseapp.com',
  projectId: 'chatapp2-868c3',
  storageBucket: 'chatapp2-868c3.appspot.com',
  messagingSenderId: '562632595713',
  appId: '1:562632595713:web:2fec7fde04effa53bda300',
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
