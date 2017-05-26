//voting function: action acts as id, each vote has a array of client-ids of client that accepted the vote
//if more than 50% of the current clients in the voice channel voted(yes), the function returns true
const evaluateVote = require("./evaluateVote");

module.exports = function(bot,msg,voteAction,args,options) {
    if (!bot._instance.votes[voteAction]) {
        bot._instance.votes[voteAction] = [msg.author.id];
    } else {
        bot._instance.votes[voteAction].push(msg.author.id);
    }
    if (evaluateVote(bot, msg, voteAction, args, options)) {
        bot._instance.votes[voteAction] = [];
        
        return true;
    } else {
        return false;
    }
};