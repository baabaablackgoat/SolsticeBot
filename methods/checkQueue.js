//Checks the current queue. If no song is playing,  the queue jumpstarts

module.exports=function(bot,msg,args,options) {
    if (typeof msg.member.voiceChannelID === "undefined") {
        msg.channel.sendMessage("You're not in a voicechannel! Couldn't join a voice channel.");
    } else {
        if (!bot._instance.playing && bot._instance.queue.length > 0) {
            const joinChannel = require("./joinChannel");
            joinChannel(bot,msg);
            var item = bot._instance.queue.shift();
            const playFromQueue = require("./playFromQueue");
            setTimeout(function () {
                playFromQueue(bot,msg,item);
            }, 500);
        } else if (!bot._instance.playing && bot._instance.dispatcher) {
            bot._instance.currentlyPlaying = "";
            const disconnect = require("./disconnect");
            disconnect(bot,msg,args,options);
        }
    }
}