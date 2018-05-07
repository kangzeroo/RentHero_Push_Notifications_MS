const sendNotification = require('../api/firebase/firebase_send').sendNotification
const grabChatHistoryForSession = require('../DynamoDB/comms_chatbot_query').grabChatHistoryForSession
const getFirebaseClientIDFromSessionId = require('./Postgres/Queries/FirebaseClientIdQueries').getFirebaseClientIDFromSessionId
const saveFirebaseClientIDAndSessionRelationship = require('./Postgres/Queries/FirebaseClientIdQueries').saveFirebaseClientIDAndSessionRelationship


// POST /send_notification
exports.send_notification = function(req, res, next){
  const notification = req.body.notification
  const session_id = req.body.session_id
  // console.log(req.body)
  getFirebaseClientIDFromSessionId(session_id).then((data) => {
    // console.log(data)
    return sendNotification(notification, data[0].firebase_client_id)
  }).then((data) => {
    // console.log(data.data)
    console.log('===SUCCESS')
    res.json({
      message: "Successfully sent notification",
      data: data.data
    })
  }).catch((err) => {
    console.log(err)
    res.status(500).send({
      message: 'An error occurred',
      error: err
    })
  })
}

// POST /save_firebase_client
exports.save_firebase_client = function(req, res, next){
  const firebase_client_id = req.body.firebase_client_id
  const session_id = req.body.session_id
  saveFirebaseClientIDAndSessionRelationship(session_id, firebase_client_id).then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send({
      message: 'An error occurred'
    })
  })
}

// POST /chat_history
exports.chat_history = function(req, res, next){
  console.log('chat_history')
  console.log(req.body)
  grabChatHistoryForSession(req.body.session_id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}
