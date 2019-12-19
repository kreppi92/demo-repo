const functions = require('firebase-functions')
var jwt = require('jsonwebtoken')
const admin = require('firebase-admin')

const jwtToken = functions.config().jwt.token

admin.initializeApp()

exports.signUp = functions.https.onCall((data, context) => {
  const email = data.email
  const password = data.password

  let userData = { email: email, password: password, verified: false }

  return admin.firestore().collection('users').add(userData)
  .then(writeResult => {
    return { "success": true, email: email }
  })
  .catch(err => {
    return { "success": false, "error": "There was an error signing up. Please try again later." }
  })
})

exports.signIn = functions.https.onCall((data, context) => {
  const email = data.email
  const password = data.password
  const verify = data.verify

  return admin.firestore().collection("users").where("email", "==", email).where("password", "==", password)
  .get()
  .then(function (querySnapshot) {
    var documentId = ""
    var verified = false
    querySnapshot.forEach(function (doc) {
      documentId = doc.id
      verified = doc.data().verified
    })
    if (documentId === "") {
      return { "success": false, error: "A user with this email and password combination was not found. Please check that you have entered the right email and password." }
    } else {
      if (verified) {
        var token = jwt.sign({ email: email, password, password }, jwtKey)
        return { "success": true, "id": documentId, "token": token }
      } else{
        if (verify) {
          let userData = { verified: verify}
          return admin.firestore().collection('users').doc(documentId).update(userData)
          .then(writeResult => {
            var token = jwt.sign({ email: email, password, password }, jwtKey)
            return { "success": true, "id": documentId, "token": token }
          })
          .catch(err => {
            return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
          })
        } else {
          return { "success": false, error: "Please verify your email address by clicking on the link sent to your account." }
        }
      }
    }
  })
  .catch(err => {
    return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
  })
})