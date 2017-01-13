//Used to assign everyone with the appropriate roles the access levels.
const eachObject = require("./../methods/eachObject");
const giveAccess = require("./../methods/giveAccess");

module.exports = function (bot, msg, args, options) {
    let assignedUserAccess = {};

    msg.guild.members.array().forEach(function (GuildMember) {
        for (let roleid in options.settings.access_roles) {
            if (GuildMember._roles.includes(roleid)) {
                if (!assignedUserAccess.hasOwnProperty(GuildMember.id)) {
                    assignedUserAccess[GuildMember.id] = [];
                }
                assignedUserAccess[GuildMember.id].push(options.settings.access_roles[roleid]);
            }
        }
    });
    eachObject(assignedUserAccess, (val, key, index) => {
        giveAccess(key, Math.max(...val), bot, msg, args, options);
    });
    msg.channel.sendMessage("Access Values have been refreshed.");
};