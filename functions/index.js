const functions = require('firebase-functions')
var jwt = require('jsonwebtoken')
const admin = require('firebase-admin')
const bcrypt = require('bcrypt')
var rp = require('request-promise')

const jwtToken = functions.config().jwt.token
const sendgridKey = functions.config().sendgrid.key

admin.initializeApp()

exports.generateCode = functions.https.onCall((data, context) => {
  const email = data.email
  const generatedCode = Math.floor(Math.random() * 899999 + 100000).toString()

  let authorization = "Bearer " + sendgridKey
  let url = 'https://api.sendgrid.com/v3/mail/send'
  let options = {
    method: 'POST',
    url: url,
    headers: {
      Authorization: authorization
    },
    json: true
  }

  options.body = {
    from: {
      email:'info@satstreet.com'
    },
    template_id:'d-5b71dd36091c4720bca38449b16d4808',
    personalizations:[
      {
        to:[
          {
             email:email
          }
        ],
        dynamic_template_data: {
          code: generatedCode,
        }
      }
    ]
  }

  return admin.firestore().collection("users").where("email", "==", email)
  .get()
  .then(function (querySnapshot) {
    var documentId = ""
    querySnapshot.forEach(function (doc) {
      documentId = doc.id
    })
    if (documentId === "") {
      return admin.firestore().collection("verification").where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        var docId = ""
        querySnapshot.forEach(function (doc) {
          docId = doc.id
        })
        if (docId === "") {
          // Create the verification with the new code
          let verificationData = { email: email, code: generatedCode }

          return admin.firestore().collection('verification').add(verificationData)
          .then(writeResult => {
            return rp(options).then(function (response) {
              return { "success": true }
            })
            .catch(function (error) {
              console.log("Error is", error)
              return { "success": false , error: "There was an error sending the verification email. Please try again later."}
            })
          })
          .catch(err => {
            return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
          })
        } else {
          // Edit the verification with the new code
          let verificationData = { email: email, code: generatedCode }

          return admin.firestore().collection('verification').doc(docId).update(verificationData)
          .then(writeResult => {
            return rp(options).then(function (response) {
              return { "success": true }
            })
            .catch(function (error) {
              console.log("Error is", error)
              return { "success": false , error: "There was an error sending the verification email. Please try again later."}
            })
          })
          .catch(err => {
            return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
          })
        }
      })
      .catch(err => {
        return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
      })
      
    } else {
      return { "success": false, "error": "This user already exits. Please try signing in." }
    }
  })
  .catch(err => {
    return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
  })
})

exports.verifyCode = functions.https.onCall((data, context) => {
  const email = data.email
  const code = data.code

  return admin.firestore().collection("verification").where("email", "==", email)
  .get()
  .then(function (querySnapshot) {
    var storedCode = ""
    querySnapshot.forEach(function (doc) {
      storedCode = doc.data().code
    })

    console.log("User code", code, email)
    console.log("Stored code", storedCode)

    if (code === storedCode) {
      return { "success": true }
    } else {
      return { "success": false, "error": "The code you have entered does not match the code we sent to you." }
    }
  })
  .catch(err => {
    return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
  })
})

exports.signUp = functions.https.onCall((data, context) => {
  const email = data.email
  const password = data.password

  return admin.firestore().collection("users").where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      var documentId = ""
      querySnapshot.forEach(function (doc) {
        documentId = doc.id
      })
      if (documentId === "") {
        var hash = bcrypt.hashSync(password, 10)
        let userData = { email: email, password: hash, verified: true }
        
        return admin.firestore().collection('users').add(userData)
        .then(writeResult => {
          console.log("The write result is", writeResult)
          var token = jwt.sign({ email: email }, jwtToken)
          return { "success": true, "token": token }
        })
        .catch(err => {
          return { "success": false, "error": "There was an error signing up. Please try again later." }
        })
      } else {
        return { "success": false, "error": "This user already exits. Please try signing in." }
      }
    })
    .catch(err => {
      return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
    })  
})

exports.signIn = functions.https.onCall((data, context) => {
  const email = data.email
  const password = data.password

  return admin.firestore().collection("users").where("email", "==", email).get()
  .then(function (querySnapshot) {
    var documentId = ""
    var hash = ""
    querySnapshot.forEach(function (doc) {
      documentId = doc.id
      hash = doc.data().password
    })

    if (documentId === "") {
      return { "success": false, error: "The email and password you entered did not match our records. Please double-check and try again." }
    } else {
      const isValidPassword = bcrypt.compareSync(password, hash)

      if (!isValidPassword) {
        return { "success": false, error: "The email and password you entered did not match our records. Please double-check and try again." }
      } else {
        var token = jwt.sign({ email: email }, jwtToken)
        return { "success": true, "token": token }
      }
    }
  })
  .catch(err => {
    return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
  })
})

exports.sendEmail = functions.https.onCall((data, context) => {
  const email = data.email

  let authorization = "Bearer " + sendgridKey
  let url = 'https://api.sendgrid.com/v3/mail/send'
  let options = {
    method: 'POST',
    url: url,
    headers: {
      Authorization: authorization
    },
    json: true
  }

  options.body = {
    from: {
      email:'info@satstreet.com'
    },
    template_id:'d-5b71dd36091c4720bca38449b16d4808',
    personalizations:[
      {
        to:[
          {
             email:email
          }
        ],
        dynamic_template_data: {
          link:"http://localhost:3000?verify=true",
        }
      }
    ]
  }

  return rp(options).then(function (response) {
    return { "success": true }
  })
  .catch(function (error) {
    console.log("Error is", error)
    return { "success": false , error: "There was an error sending the verification email. Please try again later."}
  })
})


