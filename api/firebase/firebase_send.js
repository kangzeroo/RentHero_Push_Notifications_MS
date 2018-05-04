const axios = require('axios')
const authHeaders = require('./firebase_auth_headers').authHeaders
const projectID = 'renthero-landlord-ai'

exports.sendNotification = function(notification, clientTokenId){
  /*
    notification = {
      "body" : "This is an FCM notification message!",
      "title" : "FCM Message",
    }
  */
  const msg = {
    "message": {
      "token" : clientTokenId,
      "notification" : notification
    }
  }
  console.log('----- MSG')
  console.log(msg)
  const p = new Promise((res, rej) => {
    axios.post(`https://fcm.googleapis.com/v1/projects/${projectID}/messages:send`, msg, authHeaders()) // { httpsAgent: agent })
      .then((data) => {
        // once we have the response, only then do we dispatch an action to Redux
        res(data)
      })
      .catch((err) => {
        rej(err.response.data.error.details[0])
      })
  })
  return p
}




// curl -X POST -H "Authorization: Bearer ya29.c.ElqxBcNnHahUQ6fxE4Ei9FyY3VCG8MFEX8cR3SaDuYz4_Rso4yW6vD902jzwUMl4cpRp3HVabvU9pbIbYmhzTW0dAzuZZn_gRqdBhZnH6w4WJJg44PCdfVMykFA" -H "Content-Type: application/json" -d '{
// "message":{
//   "notification": {
//     "title": "FCM Message",
//     "body": "This is an FCM Message",
//   },
//   "token": "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1..."
//   }
// }' https://fcm.googleapis.com/v1/projects/renthero-landlord-ai/messages:send