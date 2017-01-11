module.exports = function (bot,msg,args,options) {
    const vote = require("./../methods/vote");
    if (vote(msg, "Skip current Song")) {
        bot._instance.dispatcher.end();
        const setGame = require("./../methods/setGame");
        setGame(options.settings.default_game);
    }
};