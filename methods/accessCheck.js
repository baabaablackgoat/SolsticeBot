//Checks if the user who called a command that requires special access has the permissions to do so. Returns true if okay. 
const userlist = require("./../data/userlist.json");
const applyBotBan = require("./applyBotBan");

module.exports = function (msg, requiredAccess, punishment) {
    if (!userlist.mods.hasOwnProperty(msg.author.id) || userlist.mods[msg.author.id].access < requiredAccess) {
        if (punishment) { //...if not false (bool) to allow passing the punishment directly
            applyBotBan(msg, "<@!" + msg.author.id + ">", punishment);
        }
        msg.channel.sendMessage("Access denied.");
        return false;
    } else {
        return true;
    }
}