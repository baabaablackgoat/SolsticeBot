const parseDuration = require("./../methods/parseduration");
module.exports = function(bot,msg,args,options) {
    if (!args[0]) {
        if (msg.author.id in bot.globalVars.remindMe) {
            let data = bot.globalVars.remindMe[msg.author.id];
            msg.channel.send("Your current reminder:\n"+new Date(data.target)+" for "+data.text);
        } else {
            msg.channel.send("You didn't ask me to remind you of something yet. `"+options.settings.prefix+" help remindme`");
        }
    } else if (args[1]) {
        let target = parseDuration(args[1],"hms");
        if (!target){
            msg.channel.send("The target you entered is invalid. Please use a JS-parseable date or hh[h:mm:ss].");
        } else {
            if (msg.author.id in bot.globalVars.remindMe) {
                let data = bot.globalVars.remindMe[msg.author.id];
                msg.channel.send("You already have a running reminder: \n`"+new Date(data.target)+"` for `"+data.text+"`");
                //Add a listener to overwrite?
            } else {
                bot.globalVars.remindMe[msg.author.id] = {
                    target: target.target,
                    text: args[0],
                    channel: String(msg.channel.id), //#spam
                };
                msg.channel.send("I will remind you of `"+args[0]+"` at `"+target.target+"`.");
            }
        }
    } else {
        msg.channel.send("You asked me to remind you of "+args[0]+", but you didn't tell me when.");
        //Make a listener?
    }
};