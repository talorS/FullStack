const express = require('express');
const router = express.Router();
const subscriptionBL = require('../models/subscriptionsExtendBL');
const jwt = require('jsonwebtoken');
const accessTokenSecret = require('../configs/secret');

const authenticateJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user.data;//for authorization (role access)
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

//Get all requests
router.route('/')
    .get(authenticateJWT,async function (req, res) {
        const subscriptions = await subscriptionBL.getSubscriptions();
        return res.json(subscriptions)
    });

//Get a subscription (Get By ID request )
router.route('/:id')
    .get(authenticateJWT,async function (req, res) {
        const id = req.params.id;
        const subscription = await subscriptionBL.getSubscription(id);
        return res.json(subscription)
    });

//Get POST(insert) request 
router.route('/')
    .post(authenticateJWT,async function (req, res) {
        const obj = req.body;
        const resp = await subscriptionBL.addSubscription(obj);
        return res.json(resp)
    });

router.route('/getWatchedMovies/:id')
    .get(authenticateJWT,async function (req, res) {
        const id = req.params.id;
        const subscriptions = await subscriptionBL.getWatchedMovies(id);
        return res.json(subscriptions)
    });

router.route('/getUnWatchedMovies/:id')
    .get(authenticateJWT,async function (req, res) {
        const id = req.params.id;
        const subscriptions = await subscriptionBL.getUnWatchedMovies(id);
        return res.json(subscriptions)
    });

router.route('/getWatchedMembers/:id')
    .get(authenticateJWT,async function (req, res) {
        const id = req.params.id;
        const subscriptions = await subscriptionBL.getWatchedMembers(id);
        return res.json(subscriptions)
    });

module.exports = router;
