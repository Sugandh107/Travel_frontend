// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGrqcYuhhQiMiiar17GWezuwLdcFueRsw",
  authDomain: "todo-4fd1b.firebaseapp.com",
  projectId: "todo-4fd1b",
  storageBucket: "todo-4fd1b.firebasestorage.app",
  messagingSenderId: "88849012435",
  appId: "1:88849012435:web:d4c774ffc3c01a5d942626"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;