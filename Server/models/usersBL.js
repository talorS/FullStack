const dalDB = require('../DAL/usersDB');
const dalRead = require('../DAL/fileReader');
const dalWrite = require('../DAL/fileWriter');
var path = require('path');
const usersFile = path.join(__dirname, '..', 'jsonData', 'Users.json');
const usersPermFile = path.join(__dirname, '..', 'jsonData', 'Permissions.json');
const bcrypt = require("bcrypt");
const accessTokenSecret = require('../configs/secret');
const jwt = require("jsonwebtoken");

let usrJson = [];
let usrPermJson = [];

initData();

async function initData() {
    try {
        usrJson = await dalRead.readDataFromFile(usersFile);
        usrJson = usrJson.users;
        usrPermJson = await dalRead.readDataFromFile(usersPermFile);
        usrPermJson = usrPermJson.permissions;
    } catch (err) {
        console.log(err.message);
    }
}

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
    const usrDetails = usrJson.find(x => x.Id === user._id.toString());
    const usrPerm = usrPermJson.find(x => x.Id === user._id.toString());
    return Object.fromEntries(Object.entries(Object.assign({}, user._doc, usrDetails, usrPerm))
        .filter((([key, value]) => key !== 'Id')));
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

    const usrObj = {
        Id: id.toString(),
        FirstName: obj.FirstName,
        LastName: obj.LastName,
        CreatedDate: obj.CreatedDate,
        SessionTimeOut: obj.SessionTimeOut,
        Role: obj.Role
    };

    const usrPermObj = {
        Id: id.toString(),
        Permissions: obj.Permissions
    };

    usrJson.push(usrObj);
    await dalWrite.writeDataToFile(usersFile, { usrJson })
        .catch(err => { return err; });

    rusrPermJson.push(usrPermObj);
    await dalWrite.writeDataToFile(usersPermFile, { rusrPermJson })
        .catch(err => { return err; });

    return '200';
}

exports.updateUser = async function (id, obj) {
    usrDB = {
        UserName: obj.UserName
    };
    const status = await dalDB.updateUser(id, usrDB).catch(err => { return err; });

    const usrObj = {
        Id: id,
        FirstName: obj.FirstName,
        LastName: obj.LastName,
        CreatedDate: obj.CreatedDate,
        SessionTimeOut: obj.SessionTimeOut,
        Role: obj.Role
    };
    const usrPermObj = {
        Id: id,
        Permissions: obj.Permissions
    };

    let usrIndex = usrJson.findIndex(obj => obj.Id === id);
    if (usrIndex > -1) {
        usrJson[usrIndex] = usrObj;
        await dalWrite.writeDataToFile(usersFile, { usrJson })
            .catch(err => { return err; });
    }

    usrIndex = usrPermJson.findIndex(obj => obj.Id === id);
    if (usrIndex > -1) {
        usrPermJson[usrIndex] = usrPermObj;
        await dalWrite.writeDataToFile(usersPermFile, { usrPermJson })
            .catch(err => { return err; });
    }
    return status;
}

exports.deleteUser = async function (id) {
    const status = await dalDB.deleteUser(id).catch(err => { return err; });

    let ind = usrJson.findIndex(obj => obj.Id === id);
    if (ind > -1) {
        usrJson.splice(ind, 1);
        await dalWrite.writeDataToFile(usersFile, { usrJson })
            .catch(error => { return error; });
    }

    ind = usrPermJson.findIndex(obj => obj.Id === id);
    if (ind > -1) {
        usrPermJson.splice(ind, 1);
        await dalWrite.writeDataToFile(usersPermFile, { usrPermJson })
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
