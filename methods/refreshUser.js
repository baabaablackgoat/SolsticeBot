//a list of users in the voicechannel
module.exports = function(bot) {
    let user = [];
    bot._instance.userVoice.members.array().forEach(function (GuildMember) {
        if (GuildMember.user && !GuildMember.user.bot) {
            user.push(GuildMember.user);
        }
    });
    return user;
};