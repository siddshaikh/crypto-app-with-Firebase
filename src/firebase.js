import {initializeApp} from 'firebase/app'
import firebaseConfig from './config/firebseConfig'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export{auth,db}