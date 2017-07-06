//Looks up users with provided args (mentions,ids,nicks,names) and returns an array of all matching ids.
//Supports @mentions (and @!nicknamementions), usernames, nicknames, ids.
//If the user cannot be found, returns false.
module.exports=function(bot,input,guild_id=false){
    if (!input) {return false;} //If no input was given, return false to prevent crashing
    if (input.startsWith("<@!")&&input.endsWith(">")){
        input = input.substr(3,input.length-4);
    } else if (input.startsWith("<@")&&input.endsWith(">")){
        input = input.substr(2,input.length-3);
    }
    if (!isNaN(Number(input))){ //All that's left is the ID! If there's a letter or character left, this check fails.
        return [input];
    }
    //If a Guild ID was provided, check
    if (guild_id) {
        let matched_members = bot.guilds.get(guild_id).members.filter(member => member.displayName === input || member.user.username === input);
        if (matched_members.size > 0) {
            return matched_members.map(member => member.id);
        }
    }
    //If the guild search didn't return anything or no guild ID was provided, check the bot cache for the names. (Nickname search won't work here, obvs)
    let matched_users = bot.users.filter(user => user.username === input);
    if (matched_users.size > 0) {
        return matched_users.map(user => user.id);
    }
    //If all else fails, return false.
    return false;
};