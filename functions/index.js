const functions = require('firebase-functions')
var jwt = require('jsonwebtoken')
const admin = require('firebase-admin')
const bcrypt = require('bcrypt')
var rp = require('request-promise')
var bitcoinConverter = require('bitcoin-units')

const jwtToken = functions.config().jwt.token
const sendgridKey = functions.config().sendgrid.key
const satstreetToken = functions.config().satstreet.token

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
      email: 'info@satstreet.com'
    },
    template_id: 'd-5b71dd36091c4720bca38449b16d4808',
    personalizations: [
      {
        to: [
          {
            email: email
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
                      return { "success": false, error: "There was an error sending the verification email. Please try again later." }
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
                    return { "success": false, error: "There was an error sending the verification email. Please try again later." }
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
        let userData = { email: email, password: hash, verified: true, address: "" }

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

exports.checkAddress = functions.https.onCall((data, context) => {
  const token = data.token

  return jwt.verify(token, jwtToken, function (err, decoded) {
    if (err) {
      return { "success": false, "error": "Not authorized" }
    } else {
      const email = decoded.email
      return admin.firestore().collection("users").where("email", "==", email).get()
        .then(function (querySnapshot) {
          var address = ""
          var documentId = ""
          querySnapshot.forEach(function (doc) {
            documentId = doc.id
            address = doc.data().address
          })

          if (documentId === "") {
            // User not found
            return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
          } else {
            if (address === "") {
              let authorization = satstreetToken
              let url = 'https://bitgo.satstreetservices.com/getAddress'
              let options = {
                method: 'GET',
                url: url,
                headers: {
                  Authorization: authorization
                },
                json: true
              }

              options.body = {
                walletId: "5df0646eb1138b4807c67ce3a37d9eea"
              }

              return rp(options).then(function (response) {
                const generatedAddress = response.address
                console.log("Generated address", generatedAddress)
                let userData = { address: generatedAddress }
                return admin.firestore().collection('users').doc(documentId).update(userData)
                  .then(writeResult => {
                    return rp(options).then(function (response) {
                      return { "success": true, address: generatedAddress }
                    })
                      .catch(function (error) {
                        console.log("Error is", error)
                        return { "success": false, error: "There was an error generating the wallet address. Please try again later." }
                      })
                  })
              })
                .catch(function (error) {
                  console.log("Error is", error)
                  return { "success": false, error: "There was an error generating the wallet address. Please try again later." }
                })
            } else {
              // Return the existing address
              return { "success": true, address: address }
            }
          }
        })
        .catch(err => {
          return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
        })
    }
  })
})

exports.getOnchainTransactions = functions.https.onCall((data, context) => {
  const token = data.token
  const address = data.address

  return jwt.verify(token, jwtToken, function (err, decoded) {
    if (err) {
      return { "success": false, "error": "Not authorized" }
    } else {
      let authorization = satstreetToken
      let url = 'https://bitgo.satstreetservices.com/getTransactions'
      let options = {
        method: 'GET',
        url: url,
        headers: {
          Authorization: authorization
        },
        json: true
      }

      options.body = {
        walletId: "5df0646eb1138b4807c67ce3a37d9eea",
        address: address
      }

      return rp(options).then(function (response) {
        return { "success": true, response: response }
      })
        .catch(function (error) {
          console.log("Error is", error)
          return { "success": false, error: "There was an error getting onchain transactions. Please try again later." }
        })
    }
  })
})

exports.getSentTransactions = functions.https.onCall((data, context) => {
  const token = data.token

  return jwt.verify(token, jwtToken, function (err, decoded) {
    if (err) {
      return { "success": false, "error": "Not authorized" }
    } else {
      const email = decoded.email

      return admin.firestore().collection("transactions").where("from", "==", email).get()
        .then(function (querySnapshot) {
          var transactions = []
          querySnapshot.forEach(function (doc) {
            var transaction = { email: doc.data().to, amount: doc.data().amount, date: doc.data().date }
            transactions.push(transaction)
          })

          return { "success": true, "transactions": transactions }
        })
        .catch(err => {
          return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
        })
    }
  })
})

exports.getReceivedTransactions = functions.https.onCall((data, context) => {
  const token = data.token

  return jwt.verify(token, jwtToken, function (err, decoded) {
    if (err) {
      return { "success": false, "error": "Not authorized" }
    } else {
      const email = decoded.email

      return admin.firestore().collection("transactions").where("to", "==", email).get()
        .then(function (querySnapshot) {
          var transactions = []
          querySnapshot.forEach(function (doc) {
            var transaction = { email: doc.data().from, amount: doc.data().amount, date: doc.data().date }
            transactions.push(transaction)
          })

          return { "success": true, "transactions": transactions }
        })
        .catch(err => {
          return { "success": false, "error": "There was an error connecting to our server. Please try again later." }
        })
    }
  })
})

exports.postTransaction = functions.https.onCall((data, context) => {
  const token = data.token
  const toEmail = data.toEmail
  const amount = data.amount
  const type = data.type
  const date = new Date()

  return jwt.verify(token, jwtToken, function (err, decoded) {
    if (err) {
      return { "success": false, "error": "Not authorized" }
    } else {
      const fromEmail = decoded.email

      let transactionData = { from: fromEmail, to: toEmail, amount: amount, type: type, date: date }

      return admin.firestore().collection('transactions').add(transactionData)
        .then(writeResult => {
          return { "success": true }
        })
        .catch(err => {
          return { "success": false, "error": "There was an error posting the transaction. Please try again later." }
        })
    }
  })
})

exports.sendEmailReceipt = functions.https.onCall((data, context) => {
  const token = data.token
  const toEmail = data.toEmail
  const amount = data.amount

  const btcAmount = bitcoinConverter(parseInt(amount), 'satoshi').to('BTC').toString()

  return jwt.verify(token, jwtToken, function (err, decoded) {
    if (err) {
      return { "success": false, "error": "Not authorized" }
    } else {
      const fromEmail = decoded.email

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
          email: 'info@satstreet.com'
        },
        template_id: 'd-337cfdfd328248f68c24d1b28df89bcf',
        personalizations: [
          {
            to: [
              {
                email: toEmail
              }
            ],
            dynamic_template_data: {
              senderEmail: fromEmail,
              satAmount: amount,
              btcAmount: btcAmount
            }
          }
        ]
      }

      return rp(options).then(function (response) {
        return { "success": true }
      })
      .catch(function (error) {
        console.log("Error is", error)
        return { "success": false, error: "There was an error sending the email. Please try again later." }
      })
    }
  })
})

exports.getRate = functions.https.onCall((data, context) => {
  const currency = data.currency

  let authorization = "Bearer " + sendgridKey
  let url = 'https://api.coindesk.com/v1/bpi/currentprice/' + currency +'.json'
  let options = {
    method: 'GET',
    url: url,
    headers: {
      Authorization: authorization
    },
    json: true
  }

  return rp(options).then(function (response) {
    return { "success": true , rate: response.bpi[currency].rate_float}
  })
  .catch(function (error) {
    console.log("Error is", error)
    return { "success": false, error: "There was an error sending the email. Please try again later." }
  })
})