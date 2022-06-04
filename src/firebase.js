
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCKPer0pZxni5eLhn82vrqVMdBwSLyEuIQ",
  authDomain: "sdptms-fc41b.firebaseapp.com",
  projectId: "sdptms-fc41b",
  storageBucket: "sdptms-fc41b.appspot.com",
  messagingSenderId: "96974257697",
  appId: "1:96974257697:web:fd1a206b7e243da3a9ed60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app); 