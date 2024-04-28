// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD8u-HW6u8kyB3ox5ET_we32KeUElOTbXw',
  authDomain: 'tuspedidos-b06d9.firebaseapp.com',
  projectId: 'tuspedidos-b06d9',
  storageBucket: 'tuspedidos-b06d9.appspot.com',
  messagingSenderId: '195474385018',
  appId: '1:195474385018:web:ecb247827f0f026a87f3c3',
  measurementId: 'G-S9YLH28PTG'
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig )
export const FirebaseAnalytics = getAnalytics( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )

const FirebaseStorage = getStorage( FirebaseApp )
export const FirebaseStorageRef = ref( FirebaseStorage )