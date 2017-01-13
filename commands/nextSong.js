const setGame = require("./../methods/setGame");
const vote = require("./../methods/vote");

module.exports = function (bot, msg, args, options) {
    if (vote(bot, msg, "Skip current Song", args, options)) {
        bot._instance.dispatcher.end();
        setGame(bot, options.settings.default_game);
    }
};