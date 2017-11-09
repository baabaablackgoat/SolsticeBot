//a list of users in the voicechannel
module.exports = function(bot) {
    let user = [];
    if (bot._instance.userVoice === null) {return user;} //If for some reason this function was called although it shouldn't have
    bot._instance.userVoice.members.array().forEach(function (GuildMember) {
        if (GuildMember.user && !GuildMember.user.bot) {
            user.push(GuildMember.user);
        }
    });
    
    return user;
};