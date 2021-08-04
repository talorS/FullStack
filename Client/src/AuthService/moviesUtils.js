import axios from './axiosInstance';

const getMovies = async function()
{
    let resp = await axios.get('/movies').catch(err => {return err;});
    return resp.data;
}

const getMovie = async function(id)
{
    let resp = await axios.get('/movies/' + id).catch(err => {return err;});
    return resp.data;
}

const insertMovie = async function(obj)
{
    return await axios.post('/movies',obj).catch(err => {return err;});
}

const editMovie = async function(id,obj)
{
    return await axios.put('/movies/' + id,obj).catch(err => {return err;});
}


const deleteMovie = async function(id)
{
    return await axios.delete('/movies/' + id).catch(err => {return err;});
}

export default {getMovies,getMovie,deleteMovie,insertMovie,editMovie};