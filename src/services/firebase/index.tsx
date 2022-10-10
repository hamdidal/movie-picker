import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDuiN7LP1ub8kpsjH3OQCrZmlhmJtW3Zjw",
  
    authDomain: "moviepicker-e506e.firebaseapp.com",
  
    projectId: "moviepicker-e506e",
  
    storageBucket: "moviepicker-e506e.appspot.com",
  
    messagingSenderId: "341303508569",
  
    appId: "1:341303508569:web:a35e8a5a41617bacb3fb48"
  
  };
  

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
