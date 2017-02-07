const getIDfromMention = require("./../methods/getIDfromMention");
const giveAccess = require("./../methods/giveAccess");

module.exports = function (bot, msg, args, options) {
    const mentionIds = getIDfromMention(msg);

    if (mentionIds) {
        const argOffset = mentionIds.length;
        const level = Number(args[argOffset]);
        let override;
        if (args[argOffset+1] === "true" && options.useraccess >= 99) {override = true;} else {override = false;} //Set the numerical value in here to something else if you want others to have access to this. Warning, this can be dangerous!
        if (!isNaN(level)) {
            let result = giveAccess(mentionIds, level, override, bot, msg, args, options);
            switch (result) {
                case "ok": 
                    msg.channel.sendMessage("Assigned access " + level + " to the user with the ID " + mentionIds);
                    break;
                case "err_override":
                    msg.channel.sendMessage("Running this command would leave the targeted user with a lower access level. Override is required.");
                    break;
                case "err_access_insufficient":
                    msg.channel.sendMessage("You cannot assign an equal or higher access level! Override is required.");
                    break;
                case "err_owner":
                    msg.channel.sendMessage("You cannot overwrite the owner's bot access level.");
                    break;
                default:
                    msg.channel.sendMessage("Fatal Error - unknown error cause! Bug TrueMGF about it, would ya.");
                    break;
            }
        } else {
            msg.channel.sendMessage("You didn't provide a valid access level.");
        }
    } else {
        msg.channel.sendMessage("You didn't provide a valid mention.");
    }
};