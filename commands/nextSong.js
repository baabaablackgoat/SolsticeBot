module.exports = function (msg) {
    if (vote(msg, "Skip current Song")) {
        dispatcher.end();
        setGame(settings.default_game);
    }
};