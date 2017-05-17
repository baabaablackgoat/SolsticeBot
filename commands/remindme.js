const parseDuration = require("../modules/parseduration.js");
module.exports = function(bot,msg,args,options) {
    if (args[0] === null) {
        if (msg.author.id in bot.globalVars.remindMe) {
            let data = bot.globalVars.remindMe[msg.author.id];
            msg.channel.sendMessage("Your current reminder:\n"+new Date(data.target)+" for "+data.text);
        } else {
            msg.channel.sendMessage("You didn't ask me to remind you of something yet. `"+options.settings.prefix+" help remindme`");
        }
    } else if (args[1]) {
        /*
        Possibly put this snippet into parseduration aswell
         */
        let target = new Date(args[1]);
        if (!isNaN(target)){ //Is the entered date valid?
            if (target < new Date()){ //Is the parseable date in the future?
                msg.channel.sendMessage("I detected a parseable date, but it is in the past!");
                return;
            }
        } else { 
        /* current parseduration functionality, please add */
        }
        if (msg.author.id in bot.globalVars.remindMe) {
            let data = bot.globalVars.remindMe[msg.author.id];
            msg.channel.sendMessage("You already have a running reminder: \n"+new Date(data.target)+" for "+data.text);
            //add a listener for ten seconds that only listens to the message author to confirm overwrite
        } else {
            
        }
    }
};