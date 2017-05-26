const userlist = require("./../data/userlist.json");
module.exports = function(msg, caller, target, checkAccess, checkRoles) {    
    //msg is the message, obviously. caller and target are the member ids. checkAccess and checkRoles are bools - does this need to be compared?
    //Check if the targeted user has a lower Bot Access level. If not, return error string.
    if (checkAccess) {
        let caller_access = 0;
        let target_access = 0;
        if (userlist.mods.hasOwnProperty(caller)) {caller_access = userlist.mods[caller].access;}
        if (userlist.mods.hasOwnProperty(target)) {target_access = userlist.mods[target].access;}
        if (caller_access <= target_access) {
            return "err_access";
        }
    }
    //Check if the targeted user has a lower role. If not, return error string.
    if (checkRoles) {
        let guildmembers = msg.guild.members;
        let caller_role = guildmembers.get(caller).highestRole.position;
        let target_role = guildmembers.get(target).highestRole.position;
        if (caller_role <= target_role) {
            return "err_role";
        }
    }
    //All checks have passed. Return clear string.
    return "clear";
};