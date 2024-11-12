require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")



mongoose.connect(process.env.DATABASE_URI)
console.log(process.env.DATABASE_URI)
const db = mongoose.connection
db.on('error', (e) => { console.log("mongodb error: " + e) })
db.on('once', (e) => { console.log("mongodb is open") })

app.listen(3000)
console.log("Server Started!")
const subscribersRouter = require("./routes/subscribers")
app.use("/subscribers", subscribersRouter)

app.use(express.json())