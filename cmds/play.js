const fs = require("fs");
module.exports = function(bot,msg,args,options) {
    console.log(msg.author.voiceChannelID);
    if (!options.settings.player.defaultChannel && !bot._player.channel && !msg.member.voiceChannelID) { //prevent missing args
        msg.channel.send("Neither of us are in a voice channel, and I don't have a default one set. Please join a VC to use this command.");
        return;
    }

    let issuedVC; //determine which vc this song will be played in
    if (options.settings.player.lockedChannel) {issuedVC = options.settings.player.defaultChannel; console.log("locked channel");}
    else if (msg.author.voiceChannelID) {issuedVC = msg.author.voiceChannelID; console.log("author channel");}
    else if (bot._player.channel) {issuedVC = bot._player.channel; console.log("bot channel");}
    else if (options.settings.player.defaultChannel) {issuedVC = options.settings.player.defaultChannel; console.log("default channel");}
    else {msg.channel.send("Whoops, something went wrong. I couldn't determine which channel this should be played in.");
        return;
    }

    if (args[0].startsWith("<") && args[0].endsWith(">")) { //remove escape characters for embed urls
        args[0] = args[0].substr(1,args[0].length-2);
    }
    console.log(args[0]);
    fs.readdir("./data/music",(err,files)=>{
        if (!err) {
            let validfiles = [];
            files.forEach((file,index)=>{
                if (file.endsWith(".mp3") || file.endsWith(".ogg")) {
                    validfiles[index] = file.substr(0,file.length-4);
                } else {
                    validfiles[index] = null;
                }
            });
            if (validfiles.includes(args[0])){
                console.log(`${msg.author.username} queued ${args[0]} (results to ${files[validfiles.indexOf(args[0])]}) `);
                bot._player.queue.push({
                    title: "NYI", //Use npm module musicmetadata?
                    src: files[validfiles.indexOf(args[0])],
                    local: true,
                    issuedchannel: {
                        text: msg.channel.id,
                        voice: issuedVC,
                    },
                    author: msg.author.id,
                });
                console.log(bot._player.queue);
            } else {
                console.log(`Requested file not found in directory. YTDL mechanic not yet implemented.`);
            }
        } else {
            msg.channel.send("Whoops! Encountered an error: ```"+err+"```");
            console.log(`fs.readdir in play command encountered an error: ${err}`);
        }
    });
};