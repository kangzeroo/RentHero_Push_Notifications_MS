const getFirebaseAccessToken = require('./firebase_init').getFirebaseAccessToken

exports.authHeaders = function(){
  const p = new Promise((res, rej) => {
    getFirebaseAccessToken()
      .then((access_token) => {
        res({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          }
        })
      }).catch((err) => {
        console.log(err)
        rej(err)
      })
  })
  return p
}
