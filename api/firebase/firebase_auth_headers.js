const getFirebaseAccessToken = require('./firebase_init').getFirebaseAccessToken
let access_token = ''

exports.initFirebaseAuth = function() {
  // console.log('initFirebaseAuth')
  getFirebaseAccessToken().then((data) => {
    // console.log('Firebase Server Access Token: ', data)
    access_token = data
  }).catch((err) => {
    console.log(err)
  })
}

exports.authHeaders = function(){
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
}
