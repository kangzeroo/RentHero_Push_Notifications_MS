// libraries
const bodyParser = require('body-parser')

// middleware
// const google_jwt_check = require('./auth/google_jwt_check').google_jwt_check
// const origin_check = require('./auth/origin_check').origin_check

// routes
const Test = require('./routes/test_routes')
const FCM = require('./routes/fcm_routes')

// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*'})

module.exports = function(app){

	// routes
	app.get('/test', json_encoding, Test.test)

	// firebase cloud messaging
	app.post('/save_firebase_client', [json_encoding], FCM.save_firebase_client)
	app.post('/send_notification', [json_encoding], FCM.send_notification)
	app.post('/chat_history', [json_encoding], FCM.chat_history)
}
