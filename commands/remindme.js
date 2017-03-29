module.exports = function(bot,msg,args,options) {
    if (args[0] === null) {
        if (msg.author.id in bot.globalVars.remindMe) {
            let data = bot.globalVars.remindMe[msg.author.id];
            msg.channel.sendMessage("Your current reminder:\n"+new Date(data.target)+" for "+data.text);
        } else {
            msg.channel.sendMessage("You didn't ask me to remind you of something yet. `"+options.settings.prefix+" help remindme`");
        }
    } else if (args[1]) {
        if (msg.author.id in bot.globalVars.remindMe) {
            let data = bot.globalVars.remindMe[msg.author.id];
            msg.channel.sendMessage("You already have a running reminder: \n"+new Date(data.target)+" for "+data.text);
            //add a listener for ten seconds that only listens to the message author to confirm overwrite
        } else {
            
        }
    }
};