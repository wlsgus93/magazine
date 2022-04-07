import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig={
    apiKey: "AIzaSyDeZ17XXl0buQ7E_4hRheDAAQNfaS4VHD4",
  authDomain: "week-5-react.firebaseapp.com",
  projectId: "week-5-react",
  storageBucket: "week-5-react.appspot.com",
  messagingSenderId: "427143166923",
  appId: "1:427143166923:web:4ea9bc0a3597cd6332d44e",
  measurementId: "G-XLRFB31GZP"
};

const app = initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey; 
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, apiKey,db};