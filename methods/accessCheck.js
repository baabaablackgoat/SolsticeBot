//Checks if the user who called a command that requires special access has the permissions to do so. Returns true if okay. 
module.exports = function(msg, requiredAccess, punishment) {
    const userlist = require("./../data/userlist.json");
    
    if (!userlist.mods.hasOwnProperty(msg.author.id) || userlist.mods[msg.author.id].access < requiredAccess) {
        if (punishment) { //...if not false (bool) to allow passing the punishment directly
            const applyBotBan = require("./applyBotBan");
            applyBotBan(msg,"<@!" + msg.author.id + ">", punishment);
        }
        msg.channel.sendMessage("Access denied.");
        return false;
    } else {
        return true;
    }
}