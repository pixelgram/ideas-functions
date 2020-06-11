const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.onDeleteIdea = functions.region('asia-northeast1').firestore.document('ideas/{ideaId}').onDelete((snapshot, context) => {
 const data = snapshot.data()
 const batch = db.batch()
 data.children.forEach((docId) => {
  const ref = db.doc(`ideas/${docId}`)
  batch.delete(ref)
 })
 return batch.commit()
})