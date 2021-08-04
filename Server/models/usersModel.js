const mongoose = require('mongoose');
const conn = require('../configs/usersDatabase');

let userSchema = new mongoose.Schema({
    UserName : String,
    Password : String
});

module.exports = conn.model('users',userSchema);

