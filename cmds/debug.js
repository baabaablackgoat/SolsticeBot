const getUserID = require("./../modules/getuserid");
module.exports = function(bot,msg,args,options) {
    if (args[0]) {
        msg.channel.send(getUserID(bot,args[0],msg.guild.id));
    } else {
        msg.channel.send(":japanese_goblin:");
    }
};