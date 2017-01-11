module.exports = function (bot,msg,args,options) {
    if (bot._instance.dispatcher) {
        bot._instance.dispatcher.end("Halted by user");
        const flushQueue = require("./../methods/flushQueue");
        flushQueue(bot,msg,args,options);
        bot._instance.userVoice.leave();
        msg.channel.send("Left voice channel.");
        bot._instance.dispatcher = null;
        bot._instance.VoiceConnection = null;
        const setGame = require("./../methods/setGame");
        setGame(options.settings.default_game);
    } else {
        msg.channel.send("Not in a voice channel!");
    }
}