//Modifies the bot's game

module.exports = function(game) {
    if (typeof game === "string") {
        bot.user.setGame(game);
        console.log("Changed Game presence to " + game);
    }
}