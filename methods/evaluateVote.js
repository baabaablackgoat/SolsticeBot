//checks if vote is now passed
    const refreshUser = require("./refreshUser");
    
module.exports = function (bot, msg, voteAction, args, options) {
    const user = refreshUser(bot);
    let all = user.length;
    let voted = 0;

    user.forEach(function (currentUser) {
        if (bot._instance.votes[voteAction].indexOf(currentUser.id) > -1) {
            voted += 1;
        }
    });
    msg.channel.send(voteAction + ": " + voted + " / " + all);

    return ((voted / all) >= 0.5);
};