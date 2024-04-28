/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
importScripts( 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app-compat.js' )
importScripts( 'https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging-compat.js' )

const firebaseConfig = {
  apiKey: 'AIzaSyD2VQkg4HIiXSG8asCKbXo9tPor8N0TMnE',
  authDomain: 'language-2f31f.firebaseapp.com',
  projectId: 'language-2f31f',
  storageBucket: 'language-2f31f.appspot.com',
  messagingSenderId: '332624466957',
  appId: '1:332624466957:web:d63725b904fbea58657144',
  measurementId: 'G-NR6ZM6MNC2'
}

// Initialize Firebase
const FirebaseApp = firebase.initializeApp( firebaseConfig )
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const messaging = firebase.messaging( FirebaseApp )

// messaging.onBackgroundMessage(payload => {
//   console.log('Message received. While you was away')
//   console.log(payload)

//   // Previo a mostrar notificacion
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/js-icon.png'
//   }

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   )
// })
