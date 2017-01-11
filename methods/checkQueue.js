//Checks the current queue. If no song is playing,  the queue jumpstarts

module.exports=function(msg) {
    if (typeof msg.member.voiceChannelID === "undefined") {
        msg.channel.sendMessage("You're not in a voicechannel! Couldn't join a voice channel.");
    } else {
        if (!playing && queue.length > 0) {
            const joinChannel = require("./joinChannel");
            joinChannel(msg);
            var item = queue.shift();
            const playFromQueue = require("./playFromQueue");
            setTimeout(function () {
                playFromQueue(msg, item);
            }, 500);
        } else if (!playing && dispatcher) {
            currentlyPlaying = "";
            const disconnect = require("./disconnect");
            disconnect(msg);
        }
    }
}