//checks if vote is now passed
module.exports = function(bot, msg, voteAction) {
    const refreshUser = require("./refreshUser");
    refreshUser(bot);
    var all = user.length;
    var voted = 0;
    user.forEach(function (currentUser) {
        if (bot._dispatcher.votes[voteAction].indexOf(currentUser.id) > -1) {
            voted += 1;
        }
    });
    msg.channel.sendMessage(voteAction + ": " + voted + " / " + all);
    return ((voted / all) >= 0.5);
};