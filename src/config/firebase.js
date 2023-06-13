
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAg_4pEsFKrCzeaeKNW9XQ7anYE8rme-TQ",
    authDomain: "jimin-9dd21.firebaseapp.com",
    databaseURL: "https://jimin-9dd21-default-rtdb.firebaseio.com",
    projectId: "jimin-9dd21",
    storageBucket: "jimin-9dd21.appspot.com",
    messagingSenderId: "218707601440",
    appId: "1:218707601440:web:c7d87d17ec39aea2837445",
    measurementId: "G-95FBQ9R9GY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);