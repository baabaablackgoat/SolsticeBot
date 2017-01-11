module.exports = function (bot, msg, type, src) {
    const setGame = require("./setGame");
    const settings = require("./../settings");
    if (bot._instance.dispatcher) {
        bot._instance.dispatcher.end("Halted due to two audio files playing at the same time");
    }
    const userVoiceID = msg.member.voiceChannelID;
    bot._instance.userVoice = msg.guild.channels.get(userVoiceID);
    bot._instance.userVoice.join().then(connection => {
        if (type === "file") {
            bot._instance.dispatcher = connection.playFile('./sounds/' + src);
        } else if (type === "stream") {
            bot._instance.dispatcher = connection.playStream(src);
        } else {
            console.log("What the fuck, man?");
        }
        bot._instance.dispatcher.on('speaking', (event, listener) => {
            if (!event) {
                bot._instance.userVoice.leave();
                bot._instance.dispatcher = null;
                setGame(bot,settings.default_game);
            }
        });
    });
};