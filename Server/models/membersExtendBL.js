const axios = require('axios');
const url = "http://localhost:3001/api/members";

exports.getMembers = async function()
{
    return await axios.get(url).catch((err) => {return err;});
}

exports.getMember = async function(id)
{
    return await axios.get(url + '/' + id).catch((err) => {return err;});
}

exports.addMember = async function(data)
{
    return await axios.post(url, data).catch((err) => {return err;});
}

exports.updateMember = async function(id, data)
{
    return await axios.put(url + '/' + id, data).catch((err) => {return err;});
}

exports.deleteMember = async function(id)
{
    let resp = await axios.delete(url + '/' + id).catch((err) => {return err;});
    resp = await axios.delete("http://localhost:3001/api/subscriptions/" + id).catch((err) => { return err; });
    return resp.data;
}