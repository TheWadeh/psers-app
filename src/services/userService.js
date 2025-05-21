// src/services/userService.js
import { db } from './firebase'
import { collection, doc, getDocs, getDoc, deleteDoc } from 'firebase/firestore'

export const fetchAllUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const fetchUserById = async (uid) => {
  const userSnap = await getDoc(doc(db, 'users', uid))
  return userSnap.exists() ? userSnap.data() : null
}

export const deleteUserById = async (uid) => {
  await deleteDoc(doc(db, 'users', uid))
}
