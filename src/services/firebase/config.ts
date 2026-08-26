import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Configuration derived from ruangwarga-app google-services.json
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC3hWhJn5ufEHm64Y2bChgweIKU_QmWNkg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ruangwarga-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ruangwarga-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ruangwarga-app.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "542145068128",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:542145068128:web:c5c235dac73013c45b5705",
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db: Firestore = getFirestore(app);
