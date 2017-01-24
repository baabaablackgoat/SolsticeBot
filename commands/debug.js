const getRoleID = require("./../methods/getRoleID");
module.exports = function (bot, msg, args, options) {
    msg.channel.sendMessage("`Debug executed.` "+ getRoleID(msg,args));
};