var express = require('express')
var router = express.Router()
var axios = require('axios')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// Enroll SMS factor
router.get('/sms', function (req, res) {
    var enrollSMS = {
        method: 'post',
        data: JSON.stringify({
            "factorType":"sms",
            "provider":"OKTA",
            "profile":{
                "phoneNumber":"+1-555-415-1337"
            }
        }),
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`SSWS ${API_TOKEN}`
        },
        url: `https://${process.env.OKTA_ORG}/api/v1/users/${userId}/factors`
    }
    res.send('Birds home page')
})


// define the about route
router.get('/about', function (req, res) {
res.send('About birds')
})
  
module.exports = router