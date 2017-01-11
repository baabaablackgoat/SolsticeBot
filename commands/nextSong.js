module.exports = function (bot,msg,args,options) {
    const vote = require("./../methods/vote");
    if (vote(bot, msg, "Skip current Song",args,options)) {
        bot._instance.dispatcher.end();
        const setGame = require("./../methods/setGame");
        setGame(options.settings.default_game);
    }
};