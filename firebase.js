// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import firebase from 'firebase/app';
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import * as admin from "firebase-admin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG_y75XhBiOZUnqnPL1AQ6E6U7EqjQIjI",
  authDomain: "thriftr-1e99d.firebaseapp.com",
  projectId: "thriftr-1e99d",
  storageBucket: "thriftr-1e99d.appspot.com",
  messagingSenderId: "281048744585",
  appId: "1:281048744585:web:53c41a16ee2d8577697c58",
  storageBucket: 'gs://thriftr-1e99d.appspot.com',
};

//require('dotenv').config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { auth, db , firebase, storage};