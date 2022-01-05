require('dotenv').config()
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var sms = require('./sms')
var users = require('./users')
const { default: axios } = require('axios')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/sms',sms)
app.use('/users',users)

app.get('/enroll/sms/:username', async function(req, res){
    let username = req.params.username
    function fetchUserID(username){
        return new Promise(function (resolve, reject) {
            axios.get(`http://localhost:3000/users/id/${username}`)
            .then((response) => {
                var userID = response.data
                resolve(userID)
            },
            (error) => {
                reject(error)
            }
            )
        })
    }

    let userID = await fetchUserID(username)
    // console.log(userID)

    function enrollSMS(userID){
        return new Promise(function (resolve, reject) {
            axios.get(`http://localhost:3000/sms/enroll/${userID}`)
            .then((response) => {
                let sms_activation = response.data
                resolve(sms_activation)
            },
            (error) => {
                reject(error)
            }
            )
        })
    }

    let sms_activation_status = await enrollSMS(userID)
    console.log(sms_activation_status)
    res.send("OK")
    
})

app.listen(3000)