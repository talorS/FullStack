const membersModel = require('../models/membersModel');

exports.countMembers = function()
{
    return new Promise((resolve, reject) =>
    {
        membersModel.countDocuments({}, function(err, count)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(count);
            }
        })
    });
}

exports.getMembers = function()
{
    return new Promise((resolve, reject) =>
    {
        membersModel.find({}, function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    });
}

exports.getMember = function(id)
{
    return new Promise((resolve, reject) =>
    {
        membersModel.findById(id, function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    });
}

exports.addMember = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        let member = new membersModel(obj);
        member.save(err =>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('200');
                }
            })
    });
}

exports.updateMember = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        membersModel.findByIdAndUpdate(id, { $set: obj }, function(err,member)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('200');
            }
        });
    })
}

exports.deleteMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        membersModel.findByIdAndDelete(id,function(err,member)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('200');
            }
        });
    })
}