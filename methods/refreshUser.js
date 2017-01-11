//a list of users in the voicechannel
module.exports = function() {
    user = [];
    userVoice.members.array().forEach(function (GuildMember) {
        if (GuildMember.user && !GuildMember.user.bot) {
            user.push(GuildMember.user);
        }
    });
}