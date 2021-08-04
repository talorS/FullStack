const axios = require('axios');
const url = "http://localhost:3001/api/movies";

exports.getMovies = async function()
{
    const resp = await axios.get(url).catch((err) => {return err;});
    return resp.data;
}

exports.getMovie = async function(id)
{
    const resp = await axios.get(url + '/' + id).catch((err) => {return err;});
    return resp.data;
}

exports.addMovie = async function(data)
{
    const resp = await axios.post(url, data).catch((err) => {return err;});
    return resp.data;
}

exports.updateMovie = async function(id, data)
{
    const resp = await axios.put(url + '/' + id, data).catch((err) => {return err;});
    return resp.data;
}

exports.deleteMovie = async function(id)
{
    let resp = await axios.delete(url + '/' + id).catch((err) => {return err;});
    resp = await axios.delete("http://localhost:3001/api/subscriptions/deleteMovieFromSubscriptions/" + id).catch((err) => { return err; });
    return resp.data;
}