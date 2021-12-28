require('dotenv').config()
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var sms = require('./sms')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/sms',sms)

app.listen(3000)