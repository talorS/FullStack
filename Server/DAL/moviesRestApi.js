const axios = require('axios');
const url = "https://api.tvmaze.com/shows";

exports.getMovies = function()
{
    return axios.get(url);
}
