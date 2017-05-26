const hasRole = require("./../methods/hasRole");
module.exports = function (bot, msg, args, options) {
    msg.channel.send(":ok_hand:");
    console.log(hasRole(msg.member,args,"all"));
};