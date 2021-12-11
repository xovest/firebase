import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBiKVbZyG2Iqqq6vzmbb6gk9oCpk2diCyE",
  authDomain: "fir-9-7fca0.firebaseapp.com",
  projectId: "fir-9-7fca0",
  storageBucket: "fir-9-7fca0.appspot.com",
  messagingSenderId: "653073579695",
  appId: "1:653073579695:web:1eb47754c9766ad9935e5a"
}

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'books')

const q = query(colRef, orderBy('createdAt'))
  
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books);
})
  
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  })
  .then(() => {
    addBookForm.reset()
  })
})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)
  
  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
  })
  
  const docRef = doc(db, 'books', 'R8oRblx9AAywhrOgeSOl')
  
  onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
  })
  
  const updateForm = document.querySelector('.update')
  updateForm.addEventListener('submit', e => {
    e.preventDefault()
    
    const docRef = doc(db, 'books', updateForm.id.value)
    updateDoc(docRef, {
      title: 'updated title'
    })
    .then(() => {
      updateForm.reset()
    })
})