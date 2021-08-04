const express = require('express');
const router = express.Router();
const moviesBL = require('../models/moviesExtendBL');
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
        const movies = await moviesBL.getMovies();
        return res.json(movies)
    });

//Get a movie (Get By ID request )
router.route('/:id')
    .get(authenticateJWT,async function (req, res) {
        const id = req.params.id;
        const movie = await moviesBL.getMovie(id);
        return res.json(movie)
    });

//Get POST(insert) request 
router.route('/')
    .post(authenticateJWT,async function (req, res) {
        const obj = req.body;
        const resp = await moviesBL.addMovie(obj);
        return res.json(resp)
    });

//Get PUT(update) request 
router.route('/:id')
    .put(authenticateJWT,async function (req, res) {
        const obj = req.body;
        const id = req.params.id;
        const resp = await moviesBL.updateMovie(id, obj);
        return res.json(resp);
    });

//Get Delete request 
router.route('/:id')
    .delete(authenticateJWT,async function (req, res) {
        const id = req.params.id;
        const resp = await moviesBL.deleteMovie(id);
        return res.json(resp);
    });

module.exports = router;
