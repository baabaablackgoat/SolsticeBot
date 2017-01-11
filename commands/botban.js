module.exports = function (bot,msg,args,options) {
    const applyBotBan = require("./../methods/applyBotBan");
    msg.channel.sendMessage(applyBotBan(msg,args[0],args[1]));
};