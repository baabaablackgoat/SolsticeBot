//Warning! This will *always* return the user object, and NOT the member object!
//Why not get?
//If the member left the guild, chances are the entered ID isn't available anymore!
module.exports = function(bot,input,guild_id){
    if (guild_id) {
        let matched_member = bot.guilds.get(guild_id).members.filterArray(member => member.id === input);
        if (matched_member.length === 1) {
            return matched_member[0].user;
        }
    }
    let matched_user = bot.users.filter(user => user.id === input);
    if (matched_user.length === 1) {
        return matched_user;
    }
    //If all else fails, return false.
    return false;
};