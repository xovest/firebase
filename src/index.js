import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "fir-9-7fca0.firebaseapp.com",
  projectId: "fir-9-7fca0",
  storageBucket: "fir-9-7fca0.appspot.com",
  messagingSenderId: "653073579695",
  appId: "1:653073579695:web:1eb47754c9766ad9935e5a"
}

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'books')

getDocs(colRef)
  .then(snapshot => {
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch(err => {
    console.log(err.message);
  })