const express = require('express');
const router = express.Router();
const subscriptionBL = require('../models/subscriptionsBL');

//Get all requests
router.route('/')
    .get(async function (req, res) {
        const subscriptions = await subscriptionBL.getSubscriptions();
        return res.json(subscriptions)
    });

//Get a subscription (Get By ID request )
router.route('/:id')
    .get(async function (req, res) {
        const id = req.params.id;
        const subscription = await subscriptionBL.getSubscription(id);
        return res.json(subscription)
    });

//Get POST(insert) request 
router.route('/')
    .post(async function (req, res) {
        const obj = req.body;
        const resp = await subscriptionBL.addSubscription(obj);
        return res.json(resp)
    });


//Get Delete request 
router.route('/:id')
    .delete(async function (req, res) {
        const memberId = req.params.id;
        const resp = await subscriptionBL.deleteSubscription(memberId);
        return res.json(resp);
    });

    //Get Delete request 
router.route('/deleteMovieFromSubscriptions/:id')
.delete(async function (req, res) {
    const movieId = req.params.id;
    const resp = await subscriptionBL.deleteMovieFromSubscriptions(movieId);
    return res.json(resp);
});

    //Get a subscription (Get By ID request )
router.route('/getWatchedMovies/:id')
.get(async function (req, res) {
    const id = req.params.id;
    const subscriptions = await subscriptionBL.getWatchedMovies(id);
    return res.json(subscriptions)
});

router.route('/getUnWatchedMovies/:movies')
.get(async function (req, res) {
    const movies = JSON.parse(req.params.movies);
    const subscriptions = await subscriptionBL.getUnWatchedMovies(movies);
    return res.json(subscriptions)
});

router.route('/getWatchedMembers/:id')
.get(async function (req, res) {
    const id = req.params.id;
    const subscriptions = await subscriptionBL.getWatchedMembers(id);
    return res.json(subscriptions)
});

module.exports = router;
