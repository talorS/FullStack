const express = require('express');

const router = express.Router();

const moviesBL = require('../models/moviesBL');

//Get all requests
router.route('/')
    .get(async function (req, res) {
        const movies = await moviesBL.getMovies();
        return res.json(movies)
    });

//Get a movie (Get By ID request )
router.route('/:id')
    .get(async function (req, res) {
        const id = req.params.id;
        const movie = await moviesBL.getMovie(id);
        return res.json(movie)
    });

//Get POST(insert) request 
router.route('/')
    .post(async function (req, res) {
        const obj = req.body;
        const resp = await moviesBL.addMovie(obj);
        return res.json(resp)
    });

//Get PUT(update) request 
router.route('/:id')
    .put(async function (req, res) {
        const obj = req.body;
        const id = req.params.id;
        const resp = await moviesBL.updateMovie(id, obj);
        return res.json(resp);
    });

//Get Delete request 
router.route('/:id')
    .delete(async function (req, res) {
        const id = req.params.id;
        const resp = await moviesBL.deleteMovie(id);
        return res.json(resp);
    });

module.exports = router;
