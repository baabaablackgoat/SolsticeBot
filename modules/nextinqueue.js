const ytdl = require("ytdl-core");
const joinVC = require("./joinvc");
const setGame = require("./setgame");
const randomInt = require("./randomInt");
let settings = require("./../settings");

const ap_loader = function (bot,vc_id){
    let ap_data = bot._player.autoplaylist[randomInt(0,bot._player.autoplaylist.length-1)];
    bot._player.queue.push({
        src: ap_data.src,
        title: ap_data.title,
        local: ap_data.local,
        issuedchannel: {
            text: false,
            voice: vc_id,
        },
        author: bot.user.id,
    }); 
};

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
                bot._player.connection.dispatcher.setVolume(settings.player.defaultvolume);
                if (bot._player.nowPlaying.issuedchannel.text) {
                    bot.channels.get(bot._player.nowPlaying.issuedchannel.text).send(`Now playing **${bot._player.nowPlaying.title}** in ${bot.channels.get(bot._player.nowPlaying.issuedchannel.voice).name}`);
                }
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
        if (bot._player.autoplaylist) {
            if (bot._player.connection) {
                ap_loader(bot,bot._player.connection.channel.id);
                nextInQueue(bot);
            } else if (settings.player.defaultChannel){
                ap_loader(bot,settings.player.defaultChannel);
                nextInQueue(bot);
            } else {
                console.log(`Autoplaylist detected, but no default channel defined nor already present in a channel. Disconnecting.`);
            }
        } else if (settings.player.lockedChannel && bot._player.connection.channel.id !== settings.player.defaultChannel) {
            joinVC(settings.player.defaultChannel);
        } else {
            try {bot._player.connection.disconnect();} catch (e) {console.log(e);}
        }
    }
};
