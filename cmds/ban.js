const getUserID = require("./../modules/getuserid");
module.exports = function(bot,msg,args,options){
    if (!args[0]){
        msg.channel.send(`You didn't tell me who you'd like to ban!`);
    }
}