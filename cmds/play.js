const fs = require("fs");
const musicmd = require("musicmetadata");
module.exports = function(bot,msg,args,options) {
    args = args.join(" ");
    if (!options.settings.player.defaultChannel && !bot._player.channel && !msg.member.voiceChannelID) { //prevent missing args
        msg.channel.send("Neither of us are in a voice channel, and I don't have a default one set. Please join a VC to use this command.");
        return;
    }

    let issuedVC; //determine which vc this song will be played in
    if (options.settings.player.lockedChannel) {issuedVC = options.settings.player.defaultChannel;}
    else if (msg.member.voiceChannelID) {issuedVC = msg.member.voiceChannelID;}
    else if (bot._player.channel) {issuedVC = bot._player.channel;}
    else if (options.settings.player.defaultChannel) {issuedVC = options.settings.player.defaultChannel;}
    else {msg.channel.send("Whoops, something went wrong. I couldn't determine which channel this should be played in.");
        return;
    }

    if (args.startsWith("<") && args.endsWith(">")) { //remove escape characters for embed urls
        args = args.substr(1,args.length-2);
    }

    fs.readdir("./data/music",(err,files)=>{ //Get all local files and check if the passed arg is in there
        if (!err) {
            let validfiles = [];
            files.forEach((file,index)=>{
                if (file.endsWith(".mp3") || file.endsWith(".ogg")) {
                    validfiles[index] = file.substr(0,file.length-4);
                } else {
                    validfiles[index] = null;
                }
            });
            if (validfiles.includes(args)){ //respective file was found
                console.log(`${msg.author.username} queued ${args} (results to ${files[validfiles.indexOf(args)]}) `);
                let musictitle = args;
                let metaStream = fs.createReadStream("./data/music/"+files[validfiles.indexOf(args)]);
                let soMeta = musicmd(metaStream,(err,metadata)=>{
                    if (!err) {
                        console.log(metadata);
                        if (metadata.title) {
                            musictitle = metadata.title;
                            if (metadata.artist.length>0) {
                                metadata.artist = metadata.artist.join(", ");
                                musictitle += ` | ${metadata.artist}`;
                            }
                        }
                    }
                    else {console.log(`Encountered an error while grabbing the metadata: ${err}`);}
                    metaStream.close();
                        bot._player.queue.push({
                        title: musictitle,
                        src: files[validfiles.indexOf(args)],
                        local: true,
                        issuedchannel: {
                            text: msg.channel.id,
                            voice: issuedVC,
                        },
                        author: msg.author.id,
                    });
                    console.log(bot._player.queue);
                    msg.channel.send(`**${musictitle}** has been queued. Now, would you kindly tell me how the hell I join a voicechannel?`);
                });
            } else {
                msg.channel.send("Sorry, I couldn't find that file, and a certain goat didn't implement YTDL yet.");
                return;
            }
        } else {
            msg.channel.send("Whoops! Encountered an error: ```"+err+"```");
            console.log(`fs.readdir in play command encountered an error: ${err}`);
        }
    });
};