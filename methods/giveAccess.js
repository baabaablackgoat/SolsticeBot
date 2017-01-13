module.exports = function(userid,access,bot,msg,args,options) {
    const fs = require("fs");
    let userlist = JSON.parse(fs.readFileSync('./data/userlist.json', 'utf8'));
    if (!userlist.mods.hasOwnProperty(userid)) {
        userlist.mods[userid] = {
            "id": Number(userid)
        };
    }
    userlist.mods[userid].access = access;
    fs.writeFile('./data/userlist.json', JSON.stringify(userlist,"  ","  "));
};