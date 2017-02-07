const fs = require("fs");
const userlist = require('../data/userlist.json');

module.exports = function (userid, access, override, bot, msg, args, options) {
    let result = "";
    if (override) {console.log("giveAccess running in override mode!");}
    for (let i=0; i<userid.length; i++) {
        if (!userlist.mods.hasOwnProperty(userid[i])) {
            userlist.mods[userid[i]] = {
                "id": Number(userid[i])
            };
        }
        if (Number(userlist.mods[userid[i]].access)>access && !override) { //If the new useraccess would be smaller, return an error to console
            console.log("The user with the id "+ userid[i] + " would have less access than before. Use override=true to bypass this. ("+access+"<"+userlist.mods[userid[i]].access+")");
            result = "err_override";
        } else {
            if (userid[i] === options.settings.owner_id && access < 99) {
                console.log("Cannot overwrite Bot Owner Access, even in override mode.");
                result = "err_owner";
            } 
            else if (!override && options.useraccess <= access) {
                console.log(msg.author.name+" attempted to assign an equal or greater bot access.");
                result = "err_access_insufficient";
            }
            else {
                userlist.mods[userid[i]].access = access;
                result = "ok";
            }
        }
        fs.writeFileSync('./data/userlist.json', JSON.stringify(userlist, "  ", "  "));
        return result;
    }
};