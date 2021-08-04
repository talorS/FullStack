const express = require('express');
const router = express.Router();
const memberBL = require('../models/membersBL');

//Get all requests
router.route('/')
    .get(async function (req, res) {
        const members = await memberBL.getMembers();
        return res.json(members)
    });

//Get a member (Get By ID request )
router.route('/:id')
    .get(async function (req, res) {
        const member = await memberBL.getMember(req.params.id);
        return res.json(member)
    });

//Get POST(insert) request 
router.route('/')
    .post(async function (req, res) {
        const resp = await memberBL.addMember(req.body);
        return res.json(resp)
    });

//Get PUT(update) request 
router.route('/:id')
    .put(async function (req, res) {
        const resp = await memberBL.updateMember(req.params.id, req.body);
        return res.json(resp);
    });

//Get Delete request 
router.route('/:id')
    .delete(async function (req, res) {
        const resp = await memberBL.deleteMember(req.params.id);
        return res.json(resp);
    });

module.exports = router;
