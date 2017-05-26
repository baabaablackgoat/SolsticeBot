//Checks if the user who called a command that requires special access has the permissions to do so. Returns true if okay. 
const userlist = require("./../data/userlist.json");
const applyBotBan = require("./applyBotBan");

module.exports = function (msg, requiredAccess, punishment) {
    let userAccess = 0;
    if (userlist.mods.hasOwnProperty(msg.author.id)) {userAccess = userlist.mods[msg.author.id].access;}
    if (userAccess >= requiredAccess) {
        return true;
    } else {
        if (punishment) {
            applyBotBan(msg,[msg.author.id], punishment, null);
        }
        msg.channel.send(msg.author.username+", you don't have access to this command. ("+userAccess+"<"+requiredAccess+")");
        
        return false;
    }
};