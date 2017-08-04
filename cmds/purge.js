const getUserID = require("./../modules/getuserid");
module.exports = function(bot,msg,args,options){
    let limit = options.settings.purge.defaultamt;
    let compare = {
        user: false,
        content: false,
        type: false,
    };
    if (!args[0]){
        msg.channel.send(`You asked me to remove messages, but you didn't tell me which ones.`);
        return;
    }
    if (typeof args[0]==="number"){
        if (args[0] > options.settings.purge.msglimit){limit = options.settings.purge.msglimit;} else {limit = args[0];} 
    } else if (["from","of","user"].includes(args[0].toLowerCase())) {
        if (!args[1]){
            msg.channel.send("You asked me to purge messages from a user, but you didn't tell me who you wish to target!");
            return;
        }
        let target = getUserID(bot,args[1],msg.guild.id);
        if (target.length > 1){
            msg.channel.send(`Oops, your input ${args[1]} could be resolved to multiple users...`);
            return;
        }
        compare.user = target;
    } 

};