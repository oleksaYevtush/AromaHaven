import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, browserSessionPersistence, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCbZoIn4glO4n0Ifirdc8GmiFDRPhC2NeA",
  authDomain: "aromahaven-96c86.firebaseapp.com",
  databaseURL: "https://aromahaven-96c86-default-rtdb.firebaseio.com",
  projectId: "aromahaven-96c86",
  storageBucket: "aromahaven-96c86.appspot.com",
  messagingSenderId: "409202418936",
  appId: "1:409202418936:web:77ea157e0e6b68c67ac70d"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  auth.setPersistence(browserSessionPersistence)
    .then(() => {
      auth.useDeviceLanguage();
      return signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
};

export { app, firestore, storage, auth, database, signInWithGoogle };
