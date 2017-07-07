module.exports = function(bot,vote,user,value){
    if (!bot._votes.hasOwnProperty(vote)) {bot._votes[vote] = {};}
    if (!bot._votes[vote].hasOwnProperty(user) || bot._votes[vote][user] !== value) {
        bot._votes[vote][user] = value;
        return true; //Vote was cast
    }  
    return false; //Duplicate vote
};