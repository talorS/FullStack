const mongoose = require('mongoose');
const conn = require('../configs/subscriptionsDatabase');

let memberSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    City : String
});

module.exports = conn.model('members',memberSchema);

