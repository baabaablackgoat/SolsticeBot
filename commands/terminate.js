module.exports = function (bot,msg,args,options) {
    const disconnect = require("./../methods/disconnect");
    disconnect(msg);
    msg.channel.sendMessage(msg.member.nickname+", no! I will not smash the sun! *shattering sound*");
    setTimeout(process.exit, 1000);
};