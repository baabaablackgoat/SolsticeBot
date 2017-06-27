const addToQueue = require("./../modules/addtoqueue");
module.exports = function(bot,msg,args,options) {
    args = args.join(" ");
    if (!options.settings.player.defaultChannel && !bot._player.channel && !msg.member.voiceChannelID) { //prevent missing args
        msg.channel.send("Neither of us are in a voice channel, and I don't have a default one set. Please join a VC to use this command.");
        return;
    }
    if (args.startsWith("<") && args.endsWith(">")) { //remove escape characters for embed urls
        args = args.substr(1,args.length-2);
    }
    addToQueue(bot,msg,args);
};