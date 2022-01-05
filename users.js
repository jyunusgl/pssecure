var express = require('express')
var router = express.Router()
var axios = require('axios')
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())

// Get User
router.get('/:username', function(req, res){
    let username = req.params.username
    let getUser = {
        method: 'get',
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`SSWS ${process.env.API_TOKEN}`
        },
        url: `https://${process.env.OKTA_ORG}/api/v1/users?q=${username}`
    }
    axios(getUser)
    .then(response => res.json(response.data))
    .catch(error => res.send(error))
})

// Get User ID from Okta
router.get('/id/:username', function(req, res){
    let username = req.params.username
    let getUser = {
        method: 'get',
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`SSWS ${process.env.API_TOKEN}`
        },
        url: `https://${process.env.OKTA_ORG}/api/v1/users?q=${username}`
    }
    axios(getUser)
    .then(response => res.send(response.data[0].id))
    .catch(error => res.send(error))
})


module.exports = router