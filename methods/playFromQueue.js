//Plays the topmost song in the queue
module.exports = function playFromQueue(bot, msg, item) {
    const ytdl = require("ytdl-core");
    const setGame = require("./setGame");
    const checkQueue = require("./checkQueue");
    if (typeof bot._instance.VoiceConnection !== 'undefined' && bot._instance.VoiceConnection) {
        bot._instance.votes["Skip current Song"] = []; // reset vote skip
        msg.channel.sendMessage("Now Playing: " + item.name);
        bot._instance.currentlyPlaying = item.name;
        const setGame = require("./setGame");
        setGame(item.name);

        if (item.stream) {
            var readable = ytdl(item.value, {
                'filter': 'audioonly'
            });
            bot._instance.dispatcher = bot._instance.VoiceConnection.playStream(readable);
            bot._instance.dispatcher.passes = 3;
        } else {
            bot._instance.dispatcher = bot._instance.VoiceConnection.playFile(item.value);
            bot._instance.dispatcher.passes = 3;
        }

        bot._instance.dispatcher.on('end', function () {
            bot._instance.playing = false;
            checkQueue(bot,msg);
        });

        /**
        dispatcher.on('error',function(err){
        	console.log("dispatch error: " + err);
        	playing = false;	
        	checkQueue(msg);
        });	
        **/

        bot._instance.playing = true;
    } else {
        setTimeout(function () {
            playFromQueue(bot,msg, item);
            console.log("retry");
        }, 100);
    }
};