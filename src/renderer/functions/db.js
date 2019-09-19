import * as firebase from 'firebase/app'
import 'firebase/firestore'
import fbconfig from '@/assets/firebase-config.json'

firebase.initializeApp(fbconfig)

export default firebase.firestore()
