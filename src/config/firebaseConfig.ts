import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwWVyd0RzJ2j6eX1tdam3zbYArfRWwAoE",
  authDomain: "appcontrolestok.firebaseapp.com",
  projectId: "appcontrolestok",
  storageBucket: "appcontrolestok.firebasestorage.app",
  messagingSenderId: "985007834598",
  appId: "1:985007834598:web:fe784016fdbd64b5874227",
  measurementId: "G-YKXQXGQSSC"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Firestore
const db = getFirestore(app);

export { db };
