var express = require('express')
var router = express.Router()
var axios = require('axios')
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// Enroll SMS factor
router.get('/enroll/:userID', function (req, res) {
    var userId = req.params.userID
    var enrollSMS = {
        method: 'post',
        data: JSON.stringify({
            "factorType":"sms",
            "provider":"OKTA",
            "profile":{
                "phoneNumber":"+1-647-673-7441"
            }
        }),
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`SSWS ${process.env.API_TOKEN}`
        },
        url: `https://${process.env.OKTA_ORG}/api/v1/users/${userId}/factors`
    }
    axios(enrollSMS)
    .then(response => {
        if(response.data.status && response.data.status == 'PENDING_ACTIVATION'){
            res.json(response.data)
        }else{
            res.send("This number is already active")
        }
    })
    .catch(error => res.send(error))
})

// Verify SMS factor
router.get('/verify/:userID', function (req, res) {
    var factorId = req.query.factorid
    var passCode = req.query.passcode
    console.log(req.query)
    var userId = req.params.userID
    var enrollSMS = {
        method: 'post',
        data: JSON.stringify({
            "passCode":passCode
        }),
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`SSWS ${process.env.API_TOKEN}`
        },
        url: `https://${process.env.OKTA_ORG}/api/v1/users/${userId}/factors/${factorId}/lifecycle/activate`
    }
    axios(enrollSMS)
    .then(response => {
        
            res.json(response.data)
        
    })
    .catch(error => res.send(error))
})


// define the about route
router.get('/about', function (req, res) {
res.send('SMS About')
})
  
module.exports = router

