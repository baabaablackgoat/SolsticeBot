const castVote = require("./../modules/castvote"); //(bot,vote,user,value)
const checkVotes = require("./../modules/checkvotes"); //(bot,vote[,value])
const clearVotes = require("./../modules/clearvotes"); //(bot,vote)

module.exports = function(bot,msg,args,options){
    if (!bot._player.connection) {
        msg.channel.send(`I'm not even in a voice channel...`);
        return;
    } else if (!bot._player.connection.dispatcher){
        msg.channel.send(`I'm not even playing anything...`);
        return;
    } else {
        if (msg.member.voiceChannelID !== bot._player.connection.channel.id){
            msg.channel.send(`${msg.member.displayName}, you're not in my voice channel.`);
            return;
        }
        let vote_cast = castVote(bot,"player",msg.author.id,true);
        let skip_votes = checkVotes(bot,"player",true);
        let req_votes = Math.round((bot._player.connection.channel.members.size - 1) * options.settings.player.skip_rate);
        if (vote_cast) {
            msg.channel.send(`${msg.member.displayName}, your vote to skip has been acknowledged. \`${skip_votes}/${req_votes}\``);
        } else {
            msg.channel.send(`${msg.member.displayName}, your vote could not be cast. \`${skip_votes}/${req_votes}\``);
        }
        if (skip_votes >= req_votes){
            bot._player.connection.dispatcher.end("Skipped by users (vote majority reached)");
            msg.channel.send(`The current song has been voteskipped.`);
            clearVotes(bot,"player");
        }
    }
};