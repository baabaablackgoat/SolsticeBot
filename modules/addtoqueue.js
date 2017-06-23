module.exports = function(bot,msg,args,issuedVC) {
    const fs = require("fs");
    const ytdl = require("ytdl-core");
    const musicmd = require("musicmetadata");
    const nextInQueue = require("./nextinqueue.js");

    let messageInfo = {
        textChannel : false,
        author : bot.user.id,
    };
    if (msg) {
        messageInfo.textChannel = msg.channel.id;
        messageInfo.author = msg.author.id;
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
                if (msg) {
                    console.log(`${msg.author.username} queued ${args} (results to ${files[validfiles.indexOf(args)]}) `);
                }
                let musictitle = args;
                let metaStream = fs.createReadStream("./data/music/"+files[validfiles.indexOf(args)]);
                let soMeta = musicmd(metaStream,(err,metadata)=>{
                    if (!err) {
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
                            text: messageInfo.textChannel,
                            voice: issuedVC,
                        },
                        author: messageInfo.author,
                    });
                    msg.channel.send(`**${musictitle}** has been queued.`);
                    if (bot._player.connection) {
                        if (!bot._player.connection.dispatcher){
                            nextInQueue(bot);
                        }
                    } else {
                        nextInQueue(bot);
                    }
                });
            } else {
                ytdl.getInfo(args,{filter: "audioonly"},(err,info)=>{
                    if (!err) {
                        bot._player.queue.push({
                            title: info.title,
                            src: args,
                            local: false,
                            issuedchannel: {
                                text: messageInfo.textChannel,
                                voice: issuedVC,
                            },
                            author: messageInfo.author,
                        });
                        if (msg) {
                            msg.channel.send(`**${info.title}** has been queued.`);
                        }
                        if (bot._player.connection) {
                            if (!bot._player.connection.dispatcher){
                                nextInQueue(bot);
                            }
                        } else {
                            nextInQueue(bot);
                        }
                    } else {
                        if (msg) {
                            msg.channel.send(`Whoops! This file doesn't exist, nor could I parse the argument from YouTube. \`${err}\``);
                        }
                    }
                });
            }
        } else {
            if (msg) {
                msg.channel.send("Whoops! Encountered an error: ```"+err+"```");
            }
            console.log(`fs.readdir in play command encountered an error: ${err}`);
        }
    });
};