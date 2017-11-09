const fs = require("fs");
const settings = require("../settings");
const userlist = require("../data/userlist.json");

module.exports = function (msg, id, expirytime) {
    if (!userlist.muted.hasOwnProperty(id)) {
        userlist.muted[id] = {};
    }
    userlist.muted[id].expires = expirytime;
    userlist.muted[id].id = Number(id);

    //The write path is relative to the ROOT directory!
    fs.writeFileSync('./data/userlist.json', JSON.stringify(userlist, "  ", "  "));
};