const fs = require("fs");
const userlist = require('../data/userlist.json');

module.exports = function (userid, access, bot, msg, args, options) {
    if (!userlist.mods.hasOwnProperty(userid)) {
        userlist.mods[userid] = {
            "id": Number(userid)
        };
    }
    userlist.mods[userid].access = access;
    fs.writeFileSync('./data/userlist.json', JSON.stringify(userlist, "  ", "  "));
};