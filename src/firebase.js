// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6KgdBZizbP_qen2gXnnkMzcSvXtEr4rU",
  authDomain: "todo-app-89892.firebaseapp.com",
  projectId: "todo-app-89892",
  storageBucket: "todo-app-89892.appspot.com",
  messagingSenderId: "655888521367",
  appId: "1:655888521367:web:36a9a559ee9e471381f1d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
