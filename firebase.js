import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAikAMQYKlm4XytxAyEBQLnoajlOCU6gRo",
    authDomain: "docs-2-f272f.firebaseapp.com",
    projectId: "docs-2-f272f",
    storageBucket: "docs-2-f272f.appspot.com",
    messagingSenderId: "587103597243",
    appId: "1:587103597243:web:814811ff3e8aec19ebef9e"
  };


  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();

  export { db };