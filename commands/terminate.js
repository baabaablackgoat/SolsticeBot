module.exports = function (bot,msg,args,options) {
    const disconnect = require("./disconnect");
    if (options.callname === "exterminate") {
        const play = require("./play");
        disconnect(bot,msg,args,options);
        msg.channel.sendMessage("EXTERMINATE! EXTERMINATE!");
        play(bot,msg,["exterminate"],options);
        setTimeout(process.exit, 10000);
    } else {
    disconnect(bot,msg,args,options);
    msg.channel.sendMessage(msg.member.nickname+", no! I will not smash the sun! *shattering sound*");
    setTimeout(process.exit, 1000);
    }
};