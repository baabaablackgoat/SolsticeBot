//Plays the topmost song in the queue
module.exports = function playFromQueue(msg, item) {
    const ytdl = require("ytdl-core");
    if (typeof VoiceConnection !== 'undefined' && VoiceConnection) {
        votes["Skip current Song"] = []; // reset vote skip
        msg.channel.sendMessage("Now Playing: " + item.name);
        currentlyPlaying = item.name;
        const setGame = require("./setGame");
        setGame(item.name);

        if (item.stream) {
            var readable = ytdl(item.value, {
                'filter': 'audioonly'
            });
            dispatcher = VoiceConnection.playStream(readable);
            dispatcher.passes = 3;
        } else {
            dispatcher = VoiceConnection.playFile(item.value);
            dispatcher.passes = 3;
        }

        dispatcher.on('end', function () {
            playing = false;
            checkQueue(msg);
        });

        /**
        dispatcher.on('error',function(err){
        	console.log("dispatch error: " + err);
        	playing = false;	
        	checkQueue(msg);
        });	
        **/

        playing = true;
    } else {
        setTimeout(function () {
            playFromQueue(msg, item);
            console.log("retry");
        }, 100);
    }
};