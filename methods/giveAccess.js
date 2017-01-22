const fs = require("fs");
const userlist = require('../data/userlist.json');

module.exports = function (userid, access, bot, msg, args, options) {
    for (i=0; i<userid.length; i++) {
        if (!userlist.mods.hasOwnProperty(userid[i])) {
            userlist.mods[userid[i]] = {
                "id": Number(userid[i])
            };
        }
        userlist.mods[userid[i]].access = access;
        fs.writeFileSync('./data/userlist.json', JSON.stringify(userlist, "  ", "  "));
    }
};