import axios from './axiosInstance';

const getWatchedMovies = async function(memberId)
{
    let resp = await axios.get('/subscriptions/getWatchedMovies/' + memberId).catch(err => {return err;});
    return resp.data;
}

const getUnWatchedMovies = async function(memberId)
{
    let resp = await axios.get('/subscriptions/getUnWatchedMovies/' + memberId).catch(err => {return err;});
    return resp.data;
}

const subscribeMovie = async function(movie)
{
    let resp = await axios.post('/subscriptions', movie).catch(err => {return err;});  
    return resp.status === 200;
}

const getWatchedMembers = async function(movieId)
{
    let resp = await axios.get('/subscriptions/getWatchedMembers/' + movieId).catch(err => {return err;});
    return resp.data;
}

export default {getUnWatchedMovies,getWatchedMovies,subscribeMovie,getWatchedMembers};