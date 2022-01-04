require('dotenv').config()
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var sms = require('./sms')
var users = require('./users')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/sms',sms)
app.use('/users',users)

app.listen(3000)