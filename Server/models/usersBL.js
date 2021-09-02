const dalDB = require('../DAL/usersDB');
const dalRead = require('../DAL/fileReader');
const dalWrite = require('../DAL/fileWriter');
var path = require('path');
const usersFile = path.join(__dirname, '..', 'jsonData', 'Users.json');
const usersPermFile = path.join(__dirname, '..', 'jsonData', 'Permissions.json');
const bcrypt = require("bcrypt");
const accessTokenSecret = require('../configs/secret');
const jwt = require("jsonwebtoken");

exports.getUsers = async function () {
    let users = await dalDB.getUsers().catch(err => { return err; });
    return Promise.all(users.map(user => getUserData(user).catch(err => console.log(err))));
}

exports.getUser = async function (id) {
    let user = await dalDB.getUser(id).catch(err => { return err; });
    if (user) {
        user = await getUserData(user).catch(err => console.log(err));
    }
    return user;
}

async function getUserData(user) {
    let usrJson = await dalRead.readDataFromFile(usersFile)
        .catch(err => { return err; });
    usrJson = usrJson.users;
    let usrPermJson = await dalRead.readDataFromFile(usersPermFile)
        .catch(err => { return err; });
    usrPermJson = usrPermJson.permissions;
    const usrDetails = usrJson.find(x => x.Id === user._id.toString());
    const usrPerm = usrPermJson.find(x => x.Id === user._id.toString());
    const userData = Object.fromEntries(Object.entries(Object.assign({}, user._doc, usrDetails, usrPerm))
        .filter((([key, value]) => key !== 'Id')));
    return userData;
}

exports.validateCredentials = async function (usr, pwd) {
    let user = await dalDB.validateCredentials(usr).catch(err => { return err; });
    if (user) {
        const password = pwd.toString();
        const validPassword = await bcrypt.compare(password, user.Password).catch(err => console.log(err));
        if (!validPassword)
            return null;
        user = await getUserData(user).catch(err => console.log(err));
        const accessToken = jwt.sign({ data: user },
            accessTokenSecret,
            { expiresIn: '2h' }
        );
        return { user, accessToken };
    }
    return user;
}

exports.addUser = async function (obj) {
    usrDB = {
        UserName: obj.UserName,
        Password: ''
    };
    const id = await dalDB.addUser(obj).catch(err => { return err; });

    usrJson = {
        Id: id.toString(),
        FirstName: obj.FirstName,
        LastName: obj.LastName,
        CreatedDate: obj.CreatedDate,
        SessionTimeOut: obj.SessionTimeOut,
        Role: obj.Role
    };
    usrPermJson = {
        Id: id.toString(),
        Permissions: obj.Permissions
    };

    let resp = await dalRead.readDataFromFile(usersFile)
        .catch(err => { return err; });
    let users = resp.users;
    users.push(usrJson);
    await dalWrite.writeDataToFile(usersFile, { users })
        .catch(err => { return err; });

    resp = await dalRead.readDataFromFile(usersPermFile)
        .catch(err => { return err; });
    let permissions = resp.permissions;
    permissions.push(usrPermJson);
    await dalWrite.writeDataToFile(usersPermFile, { permissions })
        .catch(err => { return err; });

    return '200';
}

exports.updateUser = async function (id, obj) {
    usrDB = {
        UserName: obj.UserName
    };
    const status = await dalDB.updateUser(id, usrDB).catch(err => { return err; });

    usrJson = {
        Id: id,
        FirstName: obj.FirstName,
        LastName: obj.LastName,
        CreatedDate: obj.CreatedDate,
        SessionTimeOut: obj.SessionTimeOut,
        Role: obj.Role
    };
    usrPermJson = {
        Id: id,
        Permissions: obj.Permissions
    };

    resp = await dalRead.readDataFromFile(usersFile)
        .catch(err => { return err; });
    const users = resp.users;
    let usrIndex = users.findIndex(obj => obj.Id === id);
    if (usrIndex > -1) {
        users[usrIndex] = usrJson;
        await dalWrite.writeDataToFile(usersFile, { users })
            .catch(err => { return err; });
    }

    resp = await dalRead.readDataFromFile(usersPermFile)
        .catch(err => { return err; });
    const permissions = resp.permissions;
    usrIndex = permissions.findIndex(obj => obj.Id === id);
    if (usrIndex > -1) {
        permissions[usrIndex] = usrPermJson;
        await dalWrite.writeDataToFile(usersPermFile, { permissions })
            .catch(err => { return err; });
    }
    return status;
}

exports.deleteUser = async function (id) {
    const status = await dalDB.deleteUser(id).catch(err => { return err; });

    let resp = await dalRead.readDataFromFile(usersFile)
        .catch(error => { return error; });
    const users = resp.users;
    let ind = users.findIndex(obj => obj.Id === id);
    if (ind > -1) {
        users.splice(ind, 1);
        await dalWrite.writeDataToFile(usersFile, { users })
            .catch(error => { return error; });
    }

    resp = await dalRead.readDataFromFile(usersPermFile)
        .catch(error => { return error; });
    const permissions = resp.permissions;
    ind = permissions.findIndex(obj => obj.Id === id);
    if (ind > -1) {
        permissions.splice(ind, 1);
        await dalWrite.writeDataToFile(usersPermFile, { permissions })
            .catch(error => { return error; });
    }

    return status;
}

exports.validateUserNameExist = async function (usrname) {
    return await dalDB.validateUserNameExist(usrname).catch(err => { return err; });
}

exports.register = async function (id, pwd) {
    const password = pwd.toString();
    const salt = await bcrypt.genSalt(10).catch(err => console.log(err));
    const hashedPassword = await bcrypt.hash(password, salt).catch(err => console.log(err));
    return await dalDB.register(id, hashedPassword).catch(err => { return err; });
}
