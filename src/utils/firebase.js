import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Hardcoded config (ensures it works even if env vars don't load)
const HARDCODED_CONFIG = {
  apiKey: "AIzaSyDARYMqxFfKG4zewalZuOThKCrrovAlwCc",
  authDomain: "weddingbyklippers.firebaseapp.com",
  projectId: "weddingbyklippers",
  storageBucket: "weddingbyklippers.firebasestorage.app",
  messagingSenderId: "733766807096",
  appId: "1:733766807096:web:220aa842cdc578273b00cd",
  measurementId: "G-KMBG4DNTX0"
}

// Configure your Firebase project here
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || HARDCODED_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || HARDCODED_CONFIG.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || HARDCODED_CONFIG.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || HARDCODED_CONFIG.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || HARDCODED_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || HARDCODED_CONFIG.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || HARDCODED_CONFIG.measurementId
}

console.log('🔥 Firebase Config:', {
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  fromEnv: !!import.meta.env.VITE_FIREBASE_PROJECT_ID
})

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)

export default app
