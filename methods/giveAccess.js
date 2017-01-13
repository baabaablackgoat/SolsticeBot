module.exports = function (userid, access, bot, msg, args, options) {
    console.log(userid, access);
    const fs = require("fs");
    let userlist = require('../data/userlist.json');
    if (!userlist.mods.hasOwnProperty(userid)) {
        userlist.mods[userid] = {
            "id": Number(userid)
        };
    }
    userlist.mods[userid].access = access;
    fs.writeFile('./data/userlist.json', JSON.stringify(userlist, "  ", "  "));
};