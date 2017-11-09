const disconnect = require("./disconnect");
const play = require("./play");

module.exports = function (bot, msg, args, options) {
    if (options.callname === "exterminate") {
        disconnect(bot, msg, args, options);
        msg.channel.send("EXTERMINATE! EXTERMINATE!");
        play(bot, msg, ["exterminate"], options);
        setTimeout(process.exit, 10000);
    } else {
        disconnect(bot, msg, args, options);
        msg.channel.send(msg.member.nickname + ", no! I will not smash the sun! *shattering sound*");
        setTimeout(process.exit, 1000);
    }
};