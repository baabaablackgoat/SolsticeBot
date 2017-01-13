const applyBotBan = require("./../methods/applyBotBan");

module.exports = function (bot, msg, args, options) {
    msg.channel.sendMessage(applyBotBan(msg, args[0], args[1]));
};