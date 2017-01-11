//voting function: action acts as id, each vote has a array of client-ids of client that accepted the vote
//if more than 50% of the current clients in the voice channel voted(yes), the function returns true
module.exports = function(bot,msg, voteAction) {
    if (!bot._dispatcher.votes[voteAction]) {
        bot._dispatcher.votes[voteAction] = [msg.author.id];
    } else {
        bot._dispatcher.votes[voteAction].push(msg.author.id);
    }
    const evaluateVote = require("./evaluateVote");
    if (evaluteVote(msg, voteAction)) {
        bot._dispatcher.votes[voteAction] = [];
        return true;
    } else {
        return false;
    }
}