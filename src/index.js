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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "fir-9-7fca0.firebaseapp.com",
  projectId: "fir-9-7fca0",
  storageBucket: "fir-9-7fca0.appspot.com",
  messagingSenderId: "653073579695",
  appId: "1:653073579695:web:1eb47754c9766ad9935e5a"
}

//init firebase
initializeApp(firebaseConfig)

//init service
const db = getFirestore()
const auth = getAuth()

//collection ref
const colRef = collection(db, 'books')

//queries
const q = query(colRef, orderBy('createdAt'))

//real time collect
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

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', e => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user);
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message);
    })
})


const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})

const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth()
})