import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import env from 'react-dotenv';



const firebaseConfig = {
    apiKey: env.API_KEY_FIREBASE,
    authDomain: "prueba-crud-react-ee4bb.firebaseapp.com",
    projectId: "prueba-crud-react-ee4bb",
    storageBucket: "prueba-crud-react-ee4bb.appspot.com",
    messagingSenderId: "183086234239",
    appId: "1:183086234239:web:ac7feaeadb93a6c8445d4a"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore( firebaseApp );

  export { db }