module.exports = function(bot,msg,args,options) {
    if (bot._player.nowPlaying) {
        if (!bot._player.nowPlaying.local) {
            msg.channel.send(`I'm playing **${bot._player.nowPlaying.title}** in ${bot.channels.get(bot._player.nowPlaying.issuedchannel.voice).name}.\n<${bot._player.nowPlaying.src}>`); 
        } else {
            msg.channel.send(`I'm playing **${bot._player.nowPlaying.title}** in ${bot.channels.get(bot._player.nowPlaying.issuedchannel.voice).name}.`); 
        }
         
    } else {
        msg.channel.send(`I'm not playing anything.\n...what? YOU are the one who didn't queue anything!`);
    }
};