import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "fir-9-7fca0.firebaseapp.com",
  projectId: "fir-9-7fca0",
  storageBucket: "fir-9-7fca0.appspot.com",
  messagingSenderId: "653073579695",
  appId: "1:653073579695:web:1eb47754c9766ad9935e5a"
}

initializeApp(firebaseConfig)