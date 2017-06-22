let settings = require("./../settings");
module.exports = function (bot,input) {
    if (!input) {
        bot.user.setGame(settings.default_game);
    } else {
        bot.user.setGame(input);
    }
}