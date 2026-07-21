import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check for missing environment variables in development
if (import.meta.env.DEV) {
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([key, value]) => !value && key !== 'measurementId')
    .map(([key]) => key);
    
  if (missingKeys.length > 0) {
    console.warn(`[Firebase] Missing environment variables for Firebase configuration. Please check your .env file.`);
  }
}

// Initialize Firebase only once to avoid errors during Hot Module Replacement
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore
let firestoreDb;
if (!getApps().length || !getApp().name) {
  firestoreDb = initializeFirestore(app, { experimentalForceLongPolling: true });
} else {
  try {
    firestoreDb = initializeFirestore(app, { experimentalForceLongPolling: true });
  } catch (e) {
    firestoreDb = getFirestore(app);
  }
}

export const db = firestoreDb;
export const auth = getAuth(app);
export default app;
