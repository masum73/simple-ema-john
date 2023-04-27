// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZi4qbl0FfOI1_ES2tg2tYEGpGtKGsh9U",
  authDomain: "ema-john-firebase-auth-f4da0.firebaseapp.com",
  projectId: "ema-john-firebase-auth-f4da0",
  storageBucket: "ema-john-firebase-auth-f4da0.appspot.com",
  messagingSenderId: "567748171191",
  appId: "1:567748171191:web:34d36aad76a9865ea08432"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;