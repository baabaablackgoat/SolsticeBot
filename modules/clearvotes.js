module.exports = function(bot,vote){
    if (bot._votes.hasOwnProperty(vote)){
        return delete bot._votes[vote]; //Only returns true if the vote was deleted. Else returns false.
    }
    return false;
};