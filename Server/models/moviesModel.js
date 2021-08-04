const mongoose = require('mongoose');
const conn = require('../configs/subscriptionsDatabase');

let movieSchema = new mongoose.Schema({
    Name : String,
    Genres : [String],
    Image : String,
    Premiered : Date
});

module.exports = conn.model('movies',movieSchema);

