const joinVC = require("./joinvc");
const setGame = require("./setgame");
module.exports = function(bot){
    if (bot._player.queue.length > 0) {
        bot._player.nowPlaying = bot._player.queue.shift();
        let joinPromise = joinVC(bot,bot._player.nowPlaying.issuedchannel.voice);
        joinPromise.then(()=>{
            bot._player.connection.dispatcher = bot._player.connection.playFile('./data/music/'+bot._player.nowPlaying.src);
            bot._player.connection.dispatcher.on("start",()=>{
                bot.channels.get(bot._player.nowPlaying.issuedchannel.text).send(`Now playing ${bot._player.nowPlaying.title} in ${bot.channels.get(bot._player.nowPlaying.issuedchannel.voice).name}`);
                setGame(bot,bot._player.nowPlaying.title);
            });
            bot._player.connection.dispatcher.on("error",(err)=>{
                console.log(`Audio dispatcher has encountered an error: ${err}`);
                setGame(bot,false);
            });
            bot._player.connection.dispatcher.on("end",(reason)=>{
                console.log(`Audio dispatcher has ended: ${reason}`);
                setGame(bot,false);
            });
        });
    } else {
        console.log(`Queue is empty. Cannot play`);
    }
};


/*

            player.connection.dispatcher.on("end",(reason)=>{ //Current stream has terminated - either the file or the stream is over, or something else went wrong.
                console.log(`Audio dispatcher has ended: ${reason}`);
                if (player.queue.length > 0) {
                    nextInQueue(player);
                } else if (settings.player.autoplaylist && player.autoplaylist.length > 0) {
                    //If enabled and valid playlist is available, play a random song from the autoplaylist
                } else {
                    //Disconnect from the voice channel.
                    bot.user.setGame(settings.defaultGame);
                }
            });

            player.connection.dispatcher.on("error",(err)=>{
                console.log(`Audio dispatcher has encountered an error: ${err}`);
                bot.user.setGame(settings.defaultGame);
            });
*/