module.exports = function (msg) {
    queue = [];
    if (playing) {
        dispatcher.end();
    }
    setGame(settings.default_game);
};