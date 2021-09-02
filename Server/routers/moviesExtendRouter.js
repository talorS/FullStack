const express = require('express');
const router = express.Router();
const moviesBL = require('../models/moviesExtendBL');
const auth = require("../middleware/authJWT");

//Get all requests
router.route('/')
    .get(auth,async function (req, res) {
        const movies = await moviesBL.getMovies();
        return res.json(movies)
    });

//Get a movie (Get By ID request )
router.route('/:id')
    .get(auth,async function (req, res) {
        const id = req.params.id;
        const movie = await moviesBL.getMovie(id);
        return res.json(movie)
    });

//Get POST(insert) request 
router.route('/')
    .post(auth,async function (req, res) {
        const obj = req.body;
        const resp = await moviesBL.addMovie(obj);
        return res.json(resp)
    });

//Get PUT(update) request 
router.route('/:id')
    .put(auth,async function (req, res) {
        const obj = req.body;
        const id = req.params.id;
        const resp = await moviesBL.updateMovie(id, obj);
        return res.json(resp);
    });

//Get Delete request 
router.route('/:id')
    .delete(auth,async function (req, res) {
        const id = req.params.id;
        const resp = await moviesBL.deleteMovie(id);
        return res.json(resp);
    });

module.exports = router;
