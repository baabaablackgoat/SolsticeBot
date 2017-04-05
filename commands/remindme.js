module.exports = function(bot,msg,args,options) {
    if (args[0] === null) {
        if (msg.author.id in bot.globalVars.remindMe) {
            let data = bot.globalVars.remindMe[msg.author.id];
            msg.channel.sendMessage("Your current reminder:\n"+new Date(data.target)+" for "+data.text);
        } else {
            msg.channel.sendMessage("You didn't ask me to remind you of something yet. `"+options.settings.prefix+" help remindme`");
        }
    } else if (args[1]) {
        let target = new Date(args[1]);
        if (!isNaN(target)){ //Is the entered date valid?
            if (target < new Date()){ //Is the parseable date in the future?
                msg.channel.sendMessage("I detected a parseable date, but it is in the past!");
                return;
            }
        } else {
            let raw = args[1];
            let split = target.split(":");
            let result = {
                days: 0,
                hrs: 0,
                mins: 0
            };
            if (split.length > 3) {
                msg.channel.sendMessage("Whoops, your input had too many target arguments! I can only take up to three time inputs (dd:hh:mm)");
                return;
            } else {
                split.reverse();
                //Do a check if it's undefined or if it's not a number.
                //If undefined, replace with 0
                //if NaN, throw an error.
                result.days = split[0];
                result.hrs = split[1];
                result.mins = split[2];
            } 

        }
        if (msg.author.id in bot.globalVars.remindMe) {
            let data = bot.globalVars.remindMe[msg.author.id];
            msg.channel.sendMessage("You already have a running reminder: \n"+new Date(data.target)+" for "+data.text);
            //add a listener for ten seconds that only listens to the message author to confirm overwrite
        } else {
            
        }
    }
};