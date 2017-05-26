const setGame = require("./../methods/setGame");

module.exports = function (bot,msg,args,options) {
    bot._instance.queue = [];
    
    if (bot._instance.playing) {
        bot._instance.dispatcher.end();
        bot._instance.playing = false;
    }
    
    setGame(bot,options.settings.default_game);
};