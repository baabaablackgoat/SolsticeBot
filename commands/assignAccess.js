const getIDfromMention = require("./../methods/getIDfromMention");
const giveAccess = require("./../methods/giveAccess");

module.exports = function (bot, msg, args, options) {
    if (getIDfromMention(msg)) {
        const level = Number(args[1]);

        if (!isNaN(level)) {
            giveAccess(getIDfromMention(msg), level, bot, msg, args, options);
            msg.channel.sendMessage("Assigned access " + level + " to the user with the ID " + getIDfromMention(msg));
        } else {
            msg.channel.sendMessage("You didn't provide a valid access level.");
        }
    } else {
        msg.channel.sendMessage("You didn't provide a valid mention.");
    }
};