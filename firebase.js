// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLf9GVzkawfsMXSEeWCoR9KK4MESnmzJA",
    authDomain: "twitter-clone-180f6.firebaseapp.com",
    projectId: "twitter-clone-180f6",
    storageBucket: "twitter-clone-180f6.appspot.com",
    messagingSenderId: "185537165232",
    appId: "1:185537165232:web:3bf4ac429dd384de23c875"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };