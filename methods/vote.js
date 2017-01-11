//voting function: action acts as id, each vote has a array of client-ids of client that accepted the vote
//if more than 50% of the current clients in the voice channel voted(yes), the function returns true
module.exports = function(msg, voteAction) {
    if (!votes[voteAction]) {
        votes[voteAction] = [msg.author.id];
    } else {
        votes[voteAction].push(msg.author.id);
    }

    if (evaluteVote(msg, voteAction)) {
        votes[voteAction] = [];
        return true;
    } else {
        return false;
    }
}