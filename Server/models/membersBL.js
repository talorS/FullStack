const dalRest = require('../DAL/membersRestApi');
const dalDB = require('../DAL/membersDB');

exports.insertMembersToDB = async () => {
    const counter = await dalDB.countMembers().catch(err => {return err;});
    if (counter == 0) {
        const resp = await dalRest.getMembers().catch(err => {return err;});
        resp.data.forEach(async (member) => {
            const obj = {
                Name: member.name,
                Email: member.email,
                City: member.address.city
            };
            await dalDB.addMember(obj).catch(err => {return err;});
        });
    }
}

exports.getMembers = async () => {
    return await dalDB.getMembers().catch(err => {return err;});
}

exports.getMember = async function (id) {
    return await dalDB.getMember(id).catch(err => {return err;});
}

exports.addMember = async function (obj) {
    return await dalDB.addMember(obj).catch(err => {return err;});
}

exports.updateMember = async function (id, obj) {
    return await dalDB.updateMember(id, obj).catch(err => {return err;});
}

exports.deleteMember = async function (id) {
    return await dalDB.deleteMember(id).catch(err => {return err;});
}