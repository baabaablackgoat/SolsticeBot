//Joins the voicechannel of the message author
//Voice connection is asynchronous, takes up to 1000ms
module.exports = function(msg) {
    if (typeof VoiceConnection === 'undefined' || !VoiceConnection) {
        console.log("connecting to channel")
        const userVoiceID = msg.member.voiceChannelID;
        userVoice = msg.guild.channels.get(userVoiceID);
        refreshUser();
        userVoice.join().then(connection => {
            VoiceConnection = connection;
        });
    }
}