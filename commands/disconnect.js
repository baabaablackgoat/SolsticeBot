module.exports = function (msg) {
    if (dispatcher) {
        dispatcher.end("Halted by user");
        flushQueue(msg);
        userVoice.leave();
        msg.channel.send("Left voice channel.");
        dispatcher = null;
        VoiceConnection = null;
        setGame(settings.default_game);
    } else {
        msg.channel.send("Not in a voice channel!");
    }
}