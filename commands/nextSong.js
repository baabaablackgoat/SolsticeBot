module.exports = function (bot,msg,args,options) {
    const vote = require("./../methods/vote");
    if (vote(msg, "Skip current Song")) {
        dispatcher.end();
        const setGame = require("./../methods/setGame");
        setGame(settings.default_game);
    }
};