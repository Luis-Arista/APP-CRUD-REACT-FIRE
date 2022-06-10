import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import env from 'react-dotenv';



const firebaseConfig = {
    apiKey: env.API_KEY_FIREBASE,
    authDomain: env.AUTH_DOMAIN_FIREBASE,
    projectId: env.PROJECT_ID_FIRE,
    storageBucket: env.STORAGE_BUCKET_FIRE,
    messagingSenderId: env.MESSAGING_SENDER_ID,
    appId: env.APP_ID_FIRE
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore( firebaseApp );

  export { db }