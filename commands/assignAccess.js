const getIDfromMention = require("./../methods/getIDfromMention");
const giveAccess = require("./../methods/giveAccess");

module.exports = function (bot, msg, args, options) {
    const mentionIds = getIDfromMention(msg);

    if (mentionIds) {
        const argOffset = mentionIds.length;
        const level = Number(args[argOffset]);

        if (!isNaN(level)) {
            giveAccess(mentionIds, level, true, bot, msg, args, options);
            msg.channel.sendMessage("Assigned access " + level + " to the user with the ID " + mentionIds);
        } else {
            msg.channel.sendMessage("You didn't provide a valid access level.");
        }
    } else {
        msg.channel.sendMessage("You didn't provide a valid mention.");
    }
};