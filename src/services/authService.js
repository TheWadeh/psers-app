// src/services/authService.js
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from 'firebase/auth'
  import { doc, setDoc, getDoc } from 'firebase/firestore'
  import { auth, db } from './firebase'
  
  export const registerUser = async ({ name, email, password, location, role }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
  
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email,
      location,
      role: role || 'user',
      createdAt: new Date()
    })
  
    return { uid: user.uid, email, name, location, role: role || 'user' }
  }
  
  export const loginUser = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const docSnap = await getDoc(doc(db, 'users', user.uid))
    if (!docSnap.exists()) throw new Error('User data not found')
  
    return { uid: user.uid, email: user.email, ...docSnap.data() }
  }
  
  export const logoutUser = async () => {
    await signOut(auth)
  }
  