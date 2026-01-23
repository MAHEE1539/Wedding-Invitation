// Debug helper - remove after verification
export const checkFirebaseConfig = () => {
  console.log('=== Firebase Config Check ===')
  console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Loaded' : '❌ Missing')
  console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN)
  console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID)
  console.log('Storage Bucket:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET)
  console.log('Full Config:', {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  })
}
