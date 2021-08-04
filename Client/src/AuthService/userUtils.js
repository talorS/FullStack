import axios from './axiosInstance';

const getUsers = function()
{
    return axios.get('/users').catch(err => {return err;});
}

const deleteUser = function(id)
{
    return axios.delete('/users/' + id).catch(err => {return err;});
}

const addUser = function(obj)
{
    return axios.post('/users',obj).catch(err => {return err;});
}

const updateUser = function(id,obj)
{
    return axios.put('/users/' + id,obj).catch(err => {return err;});
}

export default {getUsers,deleteUser,addUser,updateUser};