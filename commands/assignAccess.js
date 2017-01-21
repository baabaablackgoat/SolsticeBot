const getIDfromMention = require("./../methods/getIDfromMention");
const giveAccess = require("./../methods/giveAccess");

module.exports = function (bot, msg, args, options) {
    console.log(msg);

console.log(getIDfromMention(msg));

    if (getIDfromMention(msg)) {
        if (typeof args[1] === "number") {
            giveAccess(getIDfromMention(msg), args[1], bot, msg, args, options);
            msg.channel.sendMessage("Assigned access " + args[1] + " to the user with the ID " + getIDfromMention(msg));
        } else {
            msg.channel.sendMessage("You didn't provide a valid access level.");
        }
    } else {
        msg.channel.sendMessage("You didn't provide a valid mention.");
    }
};