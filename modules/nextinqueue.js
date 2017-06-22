const ytdl = require("ytdl-core");
const joinVC = require("./joinvc");
const setGame = require("./setgame");
module.exports = function nextInQueue(bot){
    if (bot._player.queue.length > 0) {
        bot._player.nowPlaying = bot._player.queue.shift();
        let joinPromise = joinVC(bot,bot._player.nowPlaying.issuedchannel.voice);
        joinPromise.then(()=>{
            if (bot._player.nowPlaying.local) {
                bot._player.connection.dispatcher = bot._player.connection.playFile('./data/music/'+bot._player.nowPlaying.src);
            } else {
                bot._player.connection.dispatcher = bot._player.connection.playStream(ytdl(bot._player.nowPlaying.src,{"filter": "audioonly"}));
            }
            bot._player.connection.dispatcher.on("start",()=>{
                bot.channels.get(bot._player.nowPlaying.issuedchannel.text).send(`Now playing **${bot._player.nowPlaying.title}** in ${bot.channels.get(bot._player.nowPlaying.issuedchannel.voice).name}`);
                setGame(bot,bot._player.nowPlaying.title);
            });
            bot._player.connection.dispatcher.on("error",(err)=>{
                console.log(`Audio dispatcher has encountered an error: ${err}`);
                setGame(bot,false);
                nextInQueue(bot);
            });
            bot._player.connection.dispatcher.on("end",(reason)=>{
                console.log(`Audio dispatcher has ended: ${reason}`);
                setGame(bot,false);
                nextInQueue(bot);
            });
        });
    } else {
        console.log(`Queue is empty.`);
        //If autoplaylist exists, do not disconnect - instead, continue playing from the list.
        //If autoplaylist is disabled, check if the voicechannel is locked. If yes, do not disconnect.
        try {bot._player.connection.disconnect();} catch (e) {console.log(e);}
    }
};
