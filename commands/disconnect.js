module.exports = function (bot,msg,args,options) {
    if (dispatcher) {
        dispatcher.end("Halted by user");
        const flushQueue = require("./../methods/flushQueue");
        flushQueue(msg);
        userVoice.leave();
        msg.channel.send("Left voice channel.");
        dispatcher = null;
        VoiceConnection = null;
        const setGame = require("./../methods/setGame");
        setGame(settings.default_game);
    } else {
        msg.channel.send("Not in a voice channel!");
    }
}