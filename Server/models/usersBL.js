const dalDB = require('../DAL/usersDB');
const dalRead = require('../DAL/fileReader');
const dalWrite = require('../DAL/fileWriter');
var path = require('path');
const usersFile = path.join(__dirname, '..', 'jsonData', 'Users.json');
const usersPermFile = path.join(__dirname, '..', 'jsonData', 'Permissions.json');

exports.getUsers = async function () {
    let usrJson = await dalRead.readDataFromFile(usersFile)
        .catch(err => { return err; });
    usrJson = usrJson.users;
    let usrPermJson = await dalRead.readDataFromFile(usersPermFile)
        .catch(err => { return err; });
    usrPermJson = usrPermJson.permissions;
    let users = await dalDB.getUsers().catch(err => { return err; });
    users = users.map(user => {
        const usrDetails = usrJson.find(x => x.Id === user._id.toString());
        const usrPerm = usrPermJson.find(x => x.Id === user._id.toString());
        return Object.fromEntries(Object.entries(Object.assign({}, user._doc, usrDetails, usrPerm))
            .filter((([key, value]) => key !== 'Id')));
    });
    return users;
}

exports.getUser = async function (id) {
    let user = await dalDB.getUser(id).catch(err => { return err; });
    if (user) {
        let usrJson = await dalRead.readDataFromFile(usersFile)
            .catch(err => { return err; });
        usrJson = usrJson.users;
        let usrPermJson = await dalRead.readDataFromFile(usersPermFile)
            .catch(err => { return err; });
        usrPermJson = usrPermJson.permissions;
        const usrDetails = usrJson.find(x => x.Id === user._id.toString());
        const usrPerm = usrPermJson.find(x => x.Id === user._id.toString());
        user = Object.fromEntries(Object.entries(Object.assign({}, user._doc, usrDetails, usrPerm))
            .filter((([key, value]) => key !== 'Id')));
    }
    return user;
}

exports.validateCredentials = async function (usr, pwd) {
    let user = await dalDB.validateCredentials(usr, pwd).catch(err => { return err; });
    if (user) {
        let usrJson = await dalRead.readDataFromFile(usersFile)
            .catch(err => { return err; });
        usrJson = usrJson.users;
        const usrDetails = usrJson.find(x => x.Id === user._id.toString());
        let usrPermJson = await dalRead.readDataFromFile(usersPermFile)
            .catch(err => { return err; });
        usrPermJson = usrPermJson.permissions;
        const usrPerm = usrPermJson.find(x => x.Id === user._id.toString());
        user = Object.fromEntries(Object.entries(Object.assign({}, user._doc, usrDetails, usrPerm))
            .filter((([key, value]) => key !== 'Id')));
    }
    return user;
}

exports.addUser = async function (obj) {
    usrDB = {
        UserName: obj.UserName
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
    return await dalDB.register(id, pwd).catch(err => { return err; });
}
