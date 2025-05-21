import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export const reportIncident = async ({ uid, location, description }) => {
  await addDoc(collection(db, 'incidents'), {
    reportedBy: uid,
    location,
    description,
    status: 'pending',
    createdAt: serverTimestamp()
  })
}
