const give_role = require("./../modules/giverole");
const strip_role = require("./../modules/striprole");
const getUserID = require("./../modules/getUserID");

const apply_roleban = function(bot,msg,target,mode){ //if mode is true attempt to strip roles <w<

};

module.exports = function(bot,msg,args,options){
    if (!options.settings.roleban.enabled){msg.channel.send(`Rolebans are disabled on this server.`);return;}
    if (!args[0]){msg.channel.send(`You have to tell me who to roleban, silly you!`);return;}
    let users = getUserID(bot,args[0],msg.guild.id);
    if (!users){msg.channel.send(`I couldn't find the user you're looking for...`);return;}
    let mode = args[1] && ["remove","unban","off"].includes(args[1]);
};