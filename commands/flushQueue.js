module.exports = function (bot,msg,args,options) {
    queue = [];
    if (playing) {
        dispatcher.end();
    }
    const setGame = require("./../methods/setGame");
    setGame(settings.default_game);
};