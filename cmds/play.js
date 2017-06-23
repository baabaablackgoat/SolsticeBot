const addToQueue = require("./../modules/addtoqueue");
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
    addToQueue(bot,msg,args,issuedVC);
};