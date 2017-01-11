module.exports = function (bot,msg,args,options) {
    const disconnect = require("./disconnect");
    disconnect(bot,msg,args,options);
    msg.channel.sendMessage(msg.member.nickname+", no! I will not smash the sun! *shattering sound*");
    setTimeout(process.exit, 1000);
};