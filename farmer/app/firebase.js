// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCnzkdF78w3lcbQkGRKD1eyBJuvhafpzoE",
  authDomain: "farmer-c7638.firebaseapp.com",
  projectId: "farmer-c7638",
  storageBucket: "farmer-c7638.firebasestorage.app",
  messagingSenderId: "886213362702",
  appId: "1:886213362702:web:7b50a60cc2b1026a3f285f",
  measurementId: "G-VT9YX1RVQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)

export { auth,app,googleProvider };
