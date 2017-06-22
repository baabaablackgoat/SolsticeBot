module.exports = function(bot,msg,args,options){
    //eventually make this a voteskip with botadmins having instant skip permission
    if (!bot._player.connection) {
        msg.channel.send(`I'm not even in a voice channel...`);
        return;
    } else if (!bot._player.connection.dispatcher){
        msg.channel.send(`I'm not even playing anything...`);
        return;
    } else {
        bot._player.connection.dispatcher.end("Skipped by user");
        msg.channel.send(`Skipped current song.`);
    }
};