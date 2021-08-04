import axios from './axiosInstance';

const getMembers = async function()
{
    const resp = await axios.get('/members').catch(err => {return err;});
    return resp.data;
}

const getMember = async function(id)
{
    const resp = await axios.get('/members/' + id).catch(err => {return err;});
    return resp.data;
}

const editMember = async function(id,obj)
{
    return await axios.put('/members/' + id,obj).catch(err => {return err;});
}

const insertMember = async function(obj)
{
    return await axios.post('/members/',obj).catch(err => {return err;});
}

const deleteMember = async function(id)
{
    return await axios.delete('/members/' + id).catch(err => {return err;});
    
}

export default {getMembers,getMember,deleteMember,editMember,insertMember};