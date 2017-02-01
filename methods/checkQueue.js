//Checks the current queue. If no song is playing,  the queue jumpstarts
const joinChannel = require("./joinChannel");
const playFromQueue = require("./playFromQueue");
const disconnect = require("./../commands/disconnect");

module.exports = function (bot, msg, args, options) {
    if (typeof msg.member.voiceChannelID === "undefined") {
        msg.channel.sendMessage("You're not in a voicechannel! Couldn't join a voice channel.");
    } else {
        if (!bot._instance.playing && bot._instance.queue.length > 0) {
            let item = bot._instance.queue.shift();
            joinChannel(bot, msg);
            setTimeout(function () {
                playFromQueue(bot, msg, item, args, options);
            }, 500);
        } else if (!bot._instance.playing && bot._instance.dispatcher) {
            bot._instance.currentlyPlaying = "";
            disconnect(bot, msg, args, options);
        }
    }
};