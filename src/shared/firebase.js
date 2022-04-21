import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getStorage } from "firebase/storage";


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
const storage = getStorage(app);
// const auth=firebase.auth();
// const firestore=firebase.firestore();
export {auth, apiKey,db,storage};
// export {auth, apiKey, firestore};