const express = require('express')
const router = express.Router()
const Subscriber = require("../models/subscribers")
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.send(req.subscriber)
})
//create one
router.post('/', jsonParser, async (req, res) => {
    try {
        console.log(req.body)
        const subscriber = new Subscriber({
            name: req.body.name,
            subscribedToChannel: req.body.subscribedToChannel,
        })
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//update
router.patch('/:id', getSubscriber, jsonParser, async (req, res) => {
    console.log(req.subscriber)
    console.log(req.body)
    if ("name" in req.body) {
        req.subscriber.name = req.body.name
    }
    if ("subscribedToChannel" in req.body) {
        req.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await req.subscriber.save()
        res.status(200).json(updatedSubscriber)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
//delete
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        const name = req.subscriber.name
        await req.subscriber.deleteOne()
        res.json({ message: `Deleted ${name}` })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "Cannot find subscriber" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    req.subscriber = subscriber
    next()
}
module.exports = router