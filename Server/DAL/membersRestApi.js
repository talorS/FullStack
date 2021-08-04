const axios = require('axios');
const url = "https://jsonplaceholder.typicode.com/users";

exports.getMembers = function()
{
    return axios.get(url);
}