const functions = require('firebase-functions')
var jwt = require('jsonwebtoken')
const admin = require('firebase-admin')
const bcrypt = require('bcrypt')
var rp = require('request-promise')

const jwtToken = functions.config().jwt.token
const sendgridKey = functions.config().sendgrid.key

admin.initializeApp()

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
        let userData = { email: email, password: hash, verified: false }
        
        return admin.firestore().collection('users').add(userData)
        .then(writeResult => {
          return { "success": true, email: email }
        })
        .catch(err => {
          return { "success": false, "error": "There was an error signing up. Please try again later." }
        })
      } else {
        return { "success": false, "error": "A user with this email address already exits. Please try signing in instead." }
      }
    })
    .catch(err => {
      return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
    })  
})

exports.signIn = functions.https.onCall((data, context) => {
  const email = data.email
  const password = data.password
  const verify = data.verify

  return admin.firestore().collection("users").where("email", "==", email).get()
  .then(function (querySnapshot) {
    var documentId = ""
    var verified = false
    var hash = ""
    querySnapshot.forEach(function (doc) {
      documentId = doc.id
      verified = doc.data().verified
      hash = doc.data().password
    })

    if (documentId === "") {
      return { "success": false, error: "A user with this email and password combination was not found. Please check that you have entered the right email and password." }
    } else {
      const isValidPassword = bcrypt.compareSync(password, hash)

      if (!isValidPassword) {
        return { "success": false, error: "A user with this email and password combination was not found. Please check that you have entered the right email and password." }
      } else {
        if (verified) {
          var token = jwt.sign({ email: email }, jwtToken)
          return { "success": true, "id": documentId, "token": token }
        } else {
          if (verify) {
            let userData = { verified: verify}
            return admin.firestore().collection('users').doc(documentId).update(userData)
            .then(writeResult => {
              var token = jwt.sign({ email: email }, jwtToken)
              return { "success": true, "id": documentId, "token": token }
            })
            .catch(err => {
              console.log("Error is", err)
              return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
            })
          } else {
            return { "success": false, error: "Please verify your email address by clicking on the link sent to your account." }
          }
        }
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


