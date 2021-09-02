const express = require('express');
const router = express.Router();
const subscriptionBL = require('../models/subscriptionsExtendBL');
const auth = require("../middleware/authJWT");

//Get all requests
router.route('/')
    .get(auth,async function (req, res) {
        const subscriptions = await subscriptionBL.getSubscriptions();
        return res.json(subscriptions)
    });

//Get a subscription (Get By ID request )
router.route('/:id')
    .get(auth,async function (req, res) {
        const id = req.params.id;
        const subscription = await subscriptionBL.getSubscription(id);
        return res.json(subscription)
    });

//Get POST(insert) request 
router.route('/')
    .post(auth,async function (req, res) {
        const obj = req.body;
        const resp = await subscriptionBL.addSubscription(obj);
        return res.json(resp)
    });

router.route('/getWatchedMovies/:id')
    .get(auth,async function (req, res) {
        const id = req.params.id;
        const subscriptions = await subscriptionBL.getWatchedMovies(id);
        return res.json(subscriptions)
    });

router.route('/getUnWatchedMovies/:id')
    .get(auth,async function (req, res) {
        const id = req.params.id;
        const subscriptions = await subscriptionBL.getUnWatchedMovies(id);
        return res.json(subscriptions)
    });

router.route('/getWatchedMembers/:id')
    .get(auth,async function (req, res) {
        const id = req.params.id;
        const subscriptions = await subscriptionBL.getWatchedMembers(id);
        return res.json(subscriptions)
    });

module.exports = router;
