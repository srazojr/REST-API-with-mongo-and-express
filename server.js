require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


mongoose.connect(process.env.DATABASE_URI)
console.log(process.env.DATABASE_URI)
const db = mongoose.connection
db.on('error', (e) => { console.log("mongodb error: " + e) })
db.on('connection', (e) => { console.log("mongodb is open") })


console.log("Server Started!")
const subscribersRouter = require("./routes/subscribers")
app.use("/subscribers", subscribersRouter)

app.use(express.json())

app.listen(3000)

