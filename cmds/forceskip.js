const clearVotes = require("./../modules/clearvotes");
module.exports = function(bot,msg,args,options){
    if (!bot._player.connection) {
        msg.channel.send(`I'm not even in a voice channel...`);
        return;
    } else if (!bot._player.connection.dispatcher){
        msg.channel.send(`I'm not even playing anything...`);
        return;
    } else {
        bot._player.connection.dispatcher.end("Skipped by bot admin");
        msg.channel.send(`The current song has been forceskipped.`);
        clearVotes(bot,"player");
    }
};