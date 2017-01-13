module.exports = function (bot,msg,args,options) {
    bot._instance.queue = [];
    if (bot._instance.playing) {
        bot._instance.dispatcher.end();
    }
    const setGame = require("./../methods/setGame");
    setGame(bot,options.settings.default_game);
};