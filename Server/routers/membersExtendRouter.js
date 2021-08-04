const express = require('express');
const router = express.Router();
const memberBL = require('../models/membersExtendBL');
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
    .get(authenticateJWT, async function (req, res) {
        const members = await memberBL.getMembers();
        if(members)
            res.status(200).send(members.data)
        else res.sendStatus(401);
    });

//Get a member (Get By ID request )
router.route('/:id')
    .get(authenticateJWT,async function (req, res) {
        const id = req.params.id;
        const member = await memberBL.getMember(id);
        return res.json(member.data)
    });

//Get POST(insert) request 
router.route('/')
    .post(authenticateJWT,async function (req, res) {
        const obj = req.body;
        const resp = await memberBL.addMember(obj);
        return res.json(resp.data)
    });

//Get PUT(update) request 
router.route('/:id')
    .put(authenticateJWT,async function (req, res) {
        const obj = req.body;
        const id = req.params.id;
        const resp = await memberBL.updateMember(id, obj);
        return res.json(resp.data);
    });

//Get Delete request 
router.route('/:id')
    .delete(authenticateJWT,async function (req, res) {
        const id = req.params.id;
        const resp = await memberBL.deleteMember(id);
        return res.json(resp.data);
    });

module.exports = router;
