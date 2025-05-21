
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  getFirestore,
  orderBy,
  query
} from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTcC93xEe8SPjtz5YXm44KMPW1Ub-axv8",
  authDomain: "unniconet.firebaseapp.com",
  projectId: "unniconet",
  storageBucket: "unniconet.appspot.com",
  messagingSenderId: "1044655444344",
  appId: "1:1044655444344:web:c5c8dae6a87f047bb5788d",
  measurementId: "G-HZ8YLD05R2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query
};
