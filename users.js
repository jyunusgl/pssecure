var express = require('express')
var router = express.Router()
var axios = require('axios')
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())

router.get('/:username', function(req, res){
    let getUser = {
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
})

module.exports = router