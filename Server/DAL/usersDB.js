const usersModel = require('../models/usersModel');

exports.getUsers = function()
{
    return new Promise((resolve, reject) =>
    {
        usersModel.find({}, function(err, users)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(users);
            }
        })
    });
}

exports.getUser = function(id)
{
    return new Promise((resolve, reject) =>
    {
        usersModel.findById(id, function(err, user)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(user);
            }
        })
    });
}

exports.validateCredentials = function(usr,pwd)
{
    return new Promise((resolve, reject) =>
    {
        usersModel.findOne({UserName : usr, Password: pwd}, function(err, user)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(user);
            }
        })
    });
}

exports.addUser = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        let user = new usersModel(obj);

        user.save(err =>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(user._id);
                }
            })
    });
}

exports.updateUser = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        usersModel.findByIdAndUpdate(id, { $set: obj }, function(err,user)
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

exports.deleteUser = function(id)
{
    return new Promise((resolve,reject) =>
    {
        usersModel.findByIdAndDelete(id,function(err,user)
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

exports.validateUserNameExist = function(usrname)
{
    return new Promise((resolve,reject) =>
    {
        usersModel.findOne({UserName : usrname, Password : ''},function(err,user)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(user);
            }
        });
    }) 
}

exports.register = function(id, pwd)
{
    return new Promise((resolve,reject) =>
    {
        usersModel.findByIdAndUpdate(id, {Password : pwd},function(err,user)
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
