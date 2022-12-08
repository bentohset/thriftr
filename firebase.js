// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEXGoVFF1Hfse1fygd1c5ZWCAg5Om9Zj8",
  authDomain: "thriftr4.firebaseapp.com",
  projectId: "thriftr4",
  storageBucket: "thriftr4.appspot.com",
  messagingSenderId: "200902666204",
  appId: "1:200902666204:web:a8c074cbafbb67feb7d119"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth,db} 