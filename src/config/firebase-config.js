import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBDGgO50UUBtHZx0w_b9SFqIQU-hNQ-04E",
    authDomain: "fir-crud-d5041.firebaseapp.com",
    projectId: "fir-crud-d5041",
    storageBucket: "fir-crud-d5041.appspot.com",
    messagingSenderId: "1088286389797",
    appId: "1:1088286389797:web:ca92c7648db90afb71f1cc"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
