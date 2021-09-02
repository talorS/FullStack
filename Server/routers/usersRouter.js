const express = require('express');
const router = express.Router();
const usersBL = require('../models/usersBL');
const auth = require("../middleware/authJWT");


//Get all requests
router.route('/')
    .get(auth, async function (req, res) {
        if (req.user.Role === 'admin') {
            const users = await usersBL.getUsers();
            res.status(200).json(users);
        } else res.sendStatus(403);
    });

//Get a user (Get By ID request )
router.route('/:id')
    .get(auth, async function (req, res) {
        if (req.user.Role === 'admin') {
            const id = req.params.id;
            const user = await usersBL.getUser(id);
            res.status(200).json(user);
        }else res.sendStatus(403);
    });

//Get POST(insert) request 
router.route('/')
    .post(auth, async function (req, res) {
        if (req.user.Role === 'admin') {
            const obj = req.body;
            const resp = await usersBL.addUser(obj);
            res.sendStatus(200);
        }else res.sendStatus(403);
    });

//Get PUT(update) request 
router.route('/:id')
    .put(auth, async function (req, res) {
        if (req.user.Role === 'admin') {
            const obj = req.body;
            const id = req.params.id;
            const resp = await usersBL.updateUser(id, obj);
            if(resp === '200')
                res.sendStatus(200);
        }else res.sendStatus(403);
    });

//Get Delete request 
router.route('/:id')
    .delete(auth, async function (req, res) {
        if (req.user.Role === 'admin') {
            const id = req.params.id;
            const resp = await usersBL.deleteUser(id);
            res.sendStatus(200);
        }else res.sendStatus(403);
    });

router.post('/login', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const resp = await usersBL.validateCredentials(username, password);
    if (resp) {
        res.status(200).send({ accessToken : resp.accessToken, user : resp.user });
    }
    else res.sendStatus(401);
});

router.post('/register', async function (req, res) {
    const id = req.body.id;
    const pwd = req.body.password;
    const resp = await usersBL.register(id, pwd);
    if(resp === '200')
        res.sendStatus(200);
    else res.sendStatus(401);
});

router.post('/validateUser', async function (req, res) {
    const username = req.body.username;
    const user = await usersBL.validateUserNameExist(username);
    if(user)
        res.status(200).json(user._id);
    else res.sendStatus(401);
});

module.exports = router;
